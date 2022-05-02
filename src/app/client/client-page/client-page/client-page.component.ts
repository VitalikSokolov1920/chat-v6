import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Image, UserListItem} from "../../../_models";
import {UserService} from "../../user.service";
import {map, mergeMap, ReplaySubject, takeUntil} from "rxjs";
import {AuthenticationService} from "../../../_services/authentication.service";
import {FormControl} from "@angular/forms";
import {SpinnerService} from "../../../spinner/spinner.service";

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss']
})
export class ClientPageComponent implements OnInit {
  isAuthClientPage: boolean;
  user: UserListItem;

  imageControl: FormControl;

  private unsubscribe$ = new ReplaySubject(1);

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private authService: AuthenticationService,
              private router: Router,
              private spinner: SpinnerService) {}

  ngOnInit(): void {
    this.imageControl = new FormControl('');

    this.activatedRoute.paramMap.pipe(
      takeUntil(this.unsubscribe$),
      map(params => params.get('id')),
      mergeMap((id) => {
        this.isAuthClientPage = id == this.authService.authUser.id;
        return this.userService.getUserById$(id).pipe(
          map(user => {
            this.user = user;

            return id;
          })
        );
        }
      ),
      mergeMap((id) => this.userService.getUserImage$(id))
    ).subscribe((image) => {
      this.user.image = image;

      this.spinner.hide();
    });
  }

  get fullName() {
    return this.user.last_name.trim() + ' ' + this.user.first_name.trim();
  }

  imageLoaded(image: string | ArrayBuffer) {
    if (!image) {
      return;
    }

    const paths = image.toString().split(';');

    const type = paths[0].slice(5);

    const data = paths[1].slice(7);

    const img: Image = {
      type,
      data,
    };

    this.userService.sendUserImage(img).subscribe(image => {
      this.user.image = image;
    });
  }

  imageLoadError(error: any) {
    console.log(error);
  }

  navigateToDialog() {
    this.router.navigate(['/client/dialogs', this.user.id]);
  }

  addToFriends() {
    this.userService.addToFriends$(this.user.id).subscribe(result => {
      if (result.actionResult) {
        this.user.is_friends = true;
      } else {
        // добавить обработку ошибки
      }
    });
  }

  removeFromFriends() {
    this.userService.removeFromFriends$(this.user.id).subscribe(result => {
      if (result.actionResult) {
        this.user.is_friends = false;
      } else {
        // добавить обработку ошибки
      }
    });
  }
}
