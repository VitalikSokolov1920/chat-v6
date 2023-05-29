import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Image, User, UserListItem} from "../../../_models";
import {UserService} from "../../user.service";
import {map, mergeMap, ReplaySubject, takeUntil} from "rxjs";
import {AuthenticationService} from "../../../_services/authentication.service";
import {FormControl} from "@angular/forms";
import {SpinnerService} from "../../../spinner/spinner.service";
import {ErrorService} from "../../../error/error.service";

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss']
})
export class ClientPageComponent implements OnInit {
  isAuthClientPage: boolean;
  user: UserListItem;
  authUser: User;

  imageControl: FormControl;

  private unsubscribe$ = new ReplaySubject(1);

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private authService: AuthenticationService,
              private router: Router,
              private errorService: ErrorService,
              private spinner: SpinnerService) {}

  ngOnInit(): void {
    this.imageControl = new FormControl('');
    this.authUser = this.authService.authUser;

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
    this.errorService.show(error);
  }

  navigateToDialog() {
    this.router.navigate(['/client/dialogs', this.user.id]);
  }

  cancelRequestFromFriends(requestFrom: string, requestTo: string) {
    this.userService.cancelFriendRequest$(requestFrom, requestTo).subscribe(result => {
      if (result.actionResult) {
        this.user.is_friends = false;
        this.user.is_requested_friends_from_auth_user = false;
        this.user.is_requested_friends_to_auth_user = false;
      } else {
        this.errorService.show(result.error);
      }
    });
  }

  acceptFriendRequest() {
    this.userService.applyFriendRequest$(this.user.id, this.authUser.id).subscribe(result => {
      if (result.actionResult) {
        this.user.is_friends = true;
        this.user.is_requested_friends_from_auth_user = false;
        this.user.is_requested_friends_to_auth_user = false;
      } else {
        this.errorService.show(result.error);
      }
    });
  }

  addToFriends() {
    this.userService.sendRequestToFriends$(this.user.id).subscribe(result => {
      if (result.actionResult) {
        this.user.is_friends = false;
        this.user.is_requested_friends_from_auth_user = true;
        this.user.is_requested_friends_to_auth_user = false;
      } else {
        this.errorService.show(result.error);
      }
    });
  }

  removeFromFriends() {
    this.userService.cancelFriendRequest$(this.authService.authUser.id, this.user.id).subscribe(result => {
      if (result.actionResult) {
        this.user.is_friends = false;
        this.user.is_requested_friends_from_auth_user = false;
        this.user.is_requested_friends_to_auth_user = false;
      } else {
        this.errorService.show(result.error);
      }
    });
  }
}
