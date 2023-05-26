import {
  AfterViewChecked,
  Component,
  ElementRef, Inject,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DialogService} from "../../dialog.service";
import {map, mergeMap, ReplaySubject, take, takeUntil} from "rxjs";
import {Message, User} from "../../../../_models";
import {AuthenticationService} from "../../../../_services/authentication.service";
import {UserService} from "../../../user.service";
import {FormControl, Validators} from "@angular/forms";
import {SliceParamsRequest} from "../../../../_models/slice-params";
import {SpinnerService} from "../../../../spinner/spinner.service";
import {DOCUMENT} from "@angular/common";
import {ErrorService} from "../../../../error/error.service";

@Component({
  selector: 'app-current-dialog',
  templateUrl: './current-dialog.component.html',
  styleUrls: ['./current-dialog.component.scss']
})
export class CurrentDialogComponent implements OnInit, OnDestroy, AfterViewChecked {

  authUser: User;
  otherUser: User;

  dialog: Message[];

  messageControl: FormControl;

  @ViewChild('scroll', {static: false})
  dialogElem: ElementRef;

  private unsubscribe$ = new ReplaySubject(1);
  private scrolled = false;
  private maxIndex = 0;

  dialogId: string;

  private sliceParams: SliceParamsRequest;

  private getAllDialog = false;

  private totalCount: number;
  private multiplier: number;

  dateSeparator: Date;

  constructor(@Inject(DOCUMENT) private document: Document,
              public activatedRoute: ActivatedRoute,
              private dialogService: DialogService,
              private authService: AuthenticationService,
              private errorService: ErrorService,
              private userService: UserService,
              private spinner: SpinnerService) {}

  ngOnInit(): void {
    this.messageControl = new FormControl('', [Validators.required]);
    this.authUser = this.authService.authUser;

    this.userService.getUserImage$(this.authUser.id).subscribe(image => {
      this.authUser.image = image;
    });

    this.activatedRoute.paramMap.pipe(
      takeUntil(this.unsubscribe$),
      map(params => {
        this.maxIndex = 0;

        this.scrolled = false;

        this.getAllDialog = false;

        this.totalCount = 0;

        this.multiplier = 1;

        this.dialog = [];

        this.dialogId = params.get('id'); // тот, с кем я общаюсь

        return this.dialogId;
      }),
      mergeMap((id) => this.userService.getUserById$(id).pipe(
        map(user => {
          this.otherUser = user;

          return id;
        }),
      )),
      mergeMap((id) => this.dialogService.getDialogMessagesCount(id).pipe(
        map(count => {
          this.totalCount = count.total_count;

          if (this.totalCount - 25 * this.multiplier <= 0) {
            this.sliceParams = {
              limit: 25,
              offset: 0
            }
          } else {
            this.sliceParams = {
              limit: 25,
              offset: this.totalCount - 25 * this.multiplier++
            }
          }
          return id;
        })
      )),
      mergeMap((id) => this.userService.getUserImage$(id).pipe(
        map(image => {
          this.otherUser.image = image;

          return id;
        })
      )),
      mergeMap((id) => this.dialogService.getDialog$(id, this.sliceParams)),
    ).subscribe((response) => {
      this.getAllDialog = response.isEnd;

      this.totalCount = response.total_count;

      this.dialog.unshift(...response.items);

      this.spinner.hide();
    });

    this.dialogService.waitMessage$().pipe(takeUntil(this.unsubscribe$)).subscribe((message) => {
      if (String(message.send_from_id) == this.otherUser.id || String(message.send_from_id) == this.authUser.id) {
        this.dialog.push(message);
      }
    });

    this.dialogService.waitMessageRead().pipe(takeUntil(this.unsubscribe$)).subscribe(messageId => {
      this.dialog.find((item) => {
        return item.id == messageId;
      }).is_read = true;
    });
  }

  ngAfterViewChecked() {
    this.scrollBottom();
  }

  private scrollBottom() {
    if (this.dialogElem && this.dialogElem.nativeElement && !this.scrolled && this.dialog && this.dialog.length != 0) {
      const firstUnreadMsg = this.dialog.find(msg => !msg.is_read && msg.send_from_id != this.authUser.id);

      if (!firstUnreadMsg) {
        this.dialogElem.nativeElement.scrollTop = this.dialogElem.nativeElement.scrollHeight;
      } else {
        const elem = this.document.getElementById(firstUnreadMsg.id);

        elem.scrollIntoView();
      }
      this.scrolled = true;
    }
  }

  onMessageVisible(messageId: string) {
    const msg = this.dialog.find(msg => msg.id == messageId);
    if (msg.send_from_id != this.authUser.id && !msg.is_read) {
      this.dialogService.markMessageRead(messageId, this.authUser.id, this.otherUser.id).pipe(take(1)).subscribe();
    }
  }

  scrollTop() {
    if (this.dialogElem && this.dialogElem.nativeElement && this.dialog && this.dialog.length != 0) {
      if (this.dialogElem.nativeElement.scrollTop == 0 && !this.getAllDialog) {
        if (this.totalCount - 25 * this.multiplier < 0) {
          this.sliceParams = {
            limit: 25 + (this.totalCount - 25 * this.multiplier),
            offset: 0
          }
        } else {
          this.sliceParams = {
            limit: 25,
            offset: this.totalCount - 25 * this.multiplier++
          }
        }

        this.dialogService.getDialog$(this.dialogId, this.sliceParams).pipe(take(1)).subscribe((response) => {
          this.getAllDialog = response.isEnd;

          this.dialog.unshift(...response.items);

          this.dialogElem.nativeElement.scrollTop = 1;
        });
      }
    }
  }

  get fullName() {
    return this.otherUser.last_name.trim() + ' ' + this.otherUser.first_name.trim();
  }

  sendMessage() {
    const value = this.messageControl.value.trim();

    this.messageControl.setValue(value);

    if (this.messageControl.invalid) {
      return;
    }

    this.dialogService.sendMessage(this.messageControl.value, this.authUser.id, this.otherUser.id).subscribe(() => {
      this.scrolled = false;
    });

    this.messageControl.setValue(null);
  }

  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

}
