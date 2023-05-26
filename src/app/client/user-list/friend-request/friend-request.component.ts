import { Component, OnInit } from '@angular/core';
import {SpinnerService} from "../../../spinner/spinner.service";
import {UserService} from "../../user.service";
import {AuthenticationService} from "../../../_services/authentication.service";
import {User} from "../../../_models";
import {ErrorService} from "../../../error/error.service";

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.scss']
})
export class FriendRequestComponent implements OnInit {

  friendFromMeRequestList: User[];
  friendToMeRequestList: User[];

  authUser: User;

  constructor(private spinner: SpinnerService,
              private authService: AuthenticationService,
              private errorService: ErrorService,
              private userService: UserService) {}

  ngOnInit(): void {
    this.authUser = this.authService.authUser;
    this.userService.getFriendRequestsToUser$().subscribe(result => {
      if (result.actionResult) {
        this.friendToMeRequestList = result.result;

        this.friendToMeRequestList.forEach(user => {
          this.userService.getUserImage$(user.id).subscribe(image => {
            user.image = image;
          })
        });
      } else {
        this.errorService.show(result.error);
      }
      this.userService.getFriendRequestsFromUser$().subscribe(result => {
        if (result.actionResult) {
          this.friendFromMeRequestList = result.result;

          this.friendFromMeRequestList.forEach(user => {
            this.userService.getUserImage$(user.id).subscribe(image => {
              user.image = image;
            })
          });
        } else {
          this.errorService.show(result.error);
        }
      });
      this.spinner.hide();
    });
  }

  cancelFriendRequestFromAuth(item: User) {
    this.userService.cancelFriendRequest$(this.authUser.id, item.id).subscribe(result => {
      if (result.actionResult) {
        this.friendFromMeRequestList.splice(this.friendFromMeRequestList.indexOf(item), 1);
      } else {
        this.errorService.show(result.error);
      }
    });
  }

  acceptFriendRequest(item: User) {
    this.userService.applyFriendRequest$(this.authUser.id, item.id).subscribe(result => {
      if (result.actionResult) {
        this.friendToMeRequestList.splice(this.friendFromMeRequestList.indexOf(item), 1);
      } else {
        this.errorService.show(result.error);
      }
    });
  }

  cancelFriendRequestFromOther(item: User) {
    this.userService.cancelFriendRequest$(item.id, this.authUser.id).subscribe(result => {
      if (result.actionResult) {
        this.friendToMeRequestList.splice(this.friendFromMeRequestList.indexOf(item), 1);
      } else {
        this.errorService.show(result.error);
      }
    });
  }
}
