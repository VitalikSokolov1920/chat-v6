import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserListItem} from "../../../_models";
import {SelectItem} from "../../../_shared/custom-select/custom-select.component";
import {DomSanitizer} from "@angular/platform-browser";
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

  showMenu = false;

  selectOptions: SelectItem[];

  constructor(private router: Router,
              public sanitizer: DomSanitizer,
              private authService: AuthenticationService,
              private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserImage$(this.user.id).subscribe(image => {
      this.user.image = image;
    });

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
    if (this.user.id != this.authService.authUser.id) {
      this.selectOptions[2] = {
        title: 'Написать сообщение',
        value: 1,
      }
    }
    if (this.user.is_friends) {
      this.selectOptions[1] = {
        title: 'Удалить из друзей',
        value: 3
      };
    } else {
      this.selectOptions[1] = {
        title: 'Добавить в друзья',
        value: 2
      };
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
        this.addToFriends();
        break;
      case 3:
        this.removeFromFriends();
        break;
    }
  }

  navigateToDialog() {
    this.router.navigate(['client/dialogs', this.user.id]);
  }

  removeFromFriends() {
    this.userService.removeFromFriends$(this.user.id).subscribe(result => {
      if (result.actionResult) {
        this.user.is_friends = false;

        this.restoreSelect();
      } else {
        // добавить обработку ошибок
      }
    });
  }

  addToFriends() {
    this.userService.addToFriends$(this.user.id).subscribe(result => {
      if (result.actionResult) {
        this.user.is_friends = true;

        this.restoreSelect();
      } else {
        // добавить обработку ошибок
      }
    });
  }

}
