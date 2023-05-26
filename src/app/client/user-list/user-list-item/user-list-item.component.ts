import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {User, UserListItem} from "../../../_models";
import {SelectItem} from "../../../_shared/custom-select/custom-select.component";
import {AuthenticationService} from "../../../_services/authentication.service";
import {UserService} from "../../user.service";

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss']
})
export class UserListItemComponent implements OnInit {
  @Input()
  user: UserListItem;
  authUser: User;

  showMenu = false;

  selectOptions: SelectItem[];

  @Output('delete')
  deleteEmit = new EventEmitter();

  constructor(private router: Router,
              private authService: AuthenticationService,
              private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserImage$(this.user.id).subscribe(image => {
      this.user.image = image;
    });

    this.authUser = this.authService.authUser;

    this.selectOptions  = [
      {
        title: 'Перейти на страницу',
        value: 0,
      }
    ];

    this.restoreSelect();
  }

  menuClick(event: MouseEvent) {
    event.stopPropagation();

    this.showMenu = !this.showMenu;
  }

  private restoreSelect() {
    this.selectOptions  = [
      {
        title: 'Перейти на страницу',
        value: 0,
      }
    ];
    if (this.user.id != this.authService.authUser.id) {
      this.selectOptions[2] = {
        title: 'Написать сообщение',
        value: 1,
      }
      if (this.user.is_friends) {
        this.selectOptions[1] = {
          title: 'Удалить из друзей',
          value: 3
        };
      } else {
        if (this.user.is_requested_friends_from_auth_user) {
          this.selectOptions[1] = {
            title: 'Отменить запрос в друзья',
            value: 4
          }
        } else if (this.user.is_requested_friends_to_auth_user) {
          this.selectOptions[1] = {
            title: 'Отклонить запрос в друзья',
            value: 5
          }
          this.selectOptions[3] = {
            title: 'Принять запрос в друзья',
            value: 6
          }
        } else {
          this.selectOptions[1] = {
            title: 'Добавить в друзья',
            value: 2
          };
        }
      }
    }
  }

  navigateToUserPage() {
    this.router.navigate(['client/client-page', this.user.id]);
  }

  get fullName() {
    return this.user.last_name.trim() + ' ' + this.user.first_name.trim();
  }

  executeOption(selectedItem: SelectItem) {
    switch (selectedItem.value) {
      case 0:
        this.navigateToUserPage();
        break;
      case 1:
        this.navigateToDialog();
        break;
      case 2:
        // Добавить в друзья
        this.addRequestToFriends();
        break;
      case 3:
        // Удалить из друзей
        this.removeFromFriends();
        break;
      case 4:
        // Отменить запрос в друзья
        this.cancelRequestFromFriends(this.authUser.id, this.user.id);
        break;
      case 5:
        // Отклонить запрос в друзья
        this.cancelRequestFromFriends(this.user.id, this.authUser.id);
        break;
      case 6:
        // Принять запрос в друзья
        this.acceptFriendRequest();
        break;
    }
  }

  navigateToDialog() {
    this.router.navigate(['client/dialogs', this.user.id]);
  }

  cancelRequestFromFriends(requestFrom: string, requestTo: string) {
    this.userService.cancelFriendRequest$(requestFrom, requestTo).subscribe(result => {
      if (result.actionResult) {
        this.user.is_friends = false;
        this.user.is_requested_friends_from_auth_user = false;
        this.user.is_requested_friends_to_auth_user = false;

        this.restoreSelect();
      } else {
        // добавить обработку ошибок
      }
    });
  }

  addRequestToFriends() {
    this.userService.sendRequestToFriends$(this.user.id).subscribe(result => {
      if (result.actionResult) {
        this.user.is_requested_friends_from_auth_user = true;
        this.user.is_requested_friends_to_auth_user = false;
        this.user.is_friends = false;

        this.restoreSelect();
      } else {
        // добавить обработку ошибок
      }
    });
  }

  acceptFriendRequest() {
    this.userService.applyFriendRequest$(this.user.id, this.authUser.id).subscribe(result => {
      if (result.actionResult) {
        this.user.is_friends = true;
        this.user.is_requested_friends_from_auth_user = false;
        this.user.is_requested_friends_to_auth_user = false;

        this.restoreSelect();
      } else {
        // добавить обработку ошибок
      }
    });
  }

  removeFromFriends() {
    this.userService.removeFromFriends(this.user.id).subscribe(result => {
      if (result.actionResult) {
        this.deleteEmit.emit();

        this.user.is_friends = false;
        this.user.is_requested_friends_from_auth_user = false;
        this.user.is_requested_friends_to_auth_user = false;

        this.restoreSelect();
      } else {
        // добавить обработку ошибок
      }
    })
  }
}
