import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DialogService} from "../../dialog.service";
import {map, mergeMap, ReplaySubject, takeUntil} from "rxjs";
import {Message, User} from "../../../../_models";
import {AuthenticationService} from "../../../../_services/authentication.service";
import {UserService} from "../../../user.service";
import {FormControl, Validators} from "@angular/forms";
import {SpinnerService} from "../../../../spinner/spinner.service";

@Component({
  selector: 'app-current-dialog',
  templateUrl: './current-dialog.component.html',
  styleUrls: ['./current-dialog.component.scss']
})
export class CurrentDialogComponent implements OnInit, OnDestroy, AfterViewChecked {

  authUser: User;
  otherUser: User;

  showDialog = false;

  dialog: Message[];

  messageControl: FormControl;

  @ViewChild('scroll', {static: false})
  dialogElem: ElementRef;

  private unsubscribe$ = new ReplaySubject(1);

  constructor(private activatedRoute: ActivatedRoute,
              private dialogService: DialogService,
              private authService: AuthenticationService,
              private userService: UserService,
              private spinnerService: SpinnerService) {}

  ngOnInit(): void {
    this.messageControl = new FormControl('', [Validators.required]);
    this.authUser = this.authService.authUser;

    this.userService.getUserImage$(this.authUser.id).subscribe(image => {
      this.authUser.image = image;
    });

    this.activatedRoute.paramMap.pipe(
      takeUntil(this.unsubscribe$),
      map(params => {
        this.spinnerService.show();

        this.showDialog = false;

        return params.get('id')
      }),
      mergeMap((id) => this.userService.getUserById$(id).pipe(
        map(user => {
          this.otherUser = user;

          return id;
        }),
      )),
      mergeMap((id) => this.userService.getUserImage$(id).pipe(
        map(image => {
          this.otherUser.image = image;

          return id;
        })
      )),
      mergeMap((id) => this.dialogService.getDialog$<Message[]>(id))
    ).subscribe((dialog) => {
      this.dialog = dialog;

      this.showDialog = true;

      this.spinnerService.hide();
    });

    this.dialogService.waitMessage$().pipe(takeUntil(this.unsubscribe$)).subscribe((message) => {
      if (String(message.send_from_id) == this.otherUser.id || String(message.send_from_id) == this.authUser.id) {
        this.dialog.push(message);
      }
    });
  }

  ngAfterViewChecked() {
    if (this.dialogElem && this.dialogElem.nativeElement) {
      this.dialogElem.nativeElement.scrollTop = this.dialogElem.nativeElement.scrollHeight;
    }
  }

  get fullName() {
    return this.otherUser.last_name.trim() + ' ' + this.otherUser.first_name.trim();
  }

  sendMessage() {
    if (this.messageControl.invalid) {
      return;
    }

    this.dialogService.sendMessage(this.messageControl.value, this.authUser.id, this.otherUser.id);

    this.messageControl.setValue(null);
  }

  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

}
