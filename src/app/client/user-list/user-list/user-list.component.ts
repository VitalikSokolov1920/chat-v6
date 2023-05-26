import { Component, OnInit } from '@angular/core';
import {SelectItem} from "../../../_shared/custom-select/custom-select.component";
import {SELECT_ITEM, User, UserListItem} from "../../../_models";
import {UserListService} from "../user-list.service";
import {take} from "rxjs";
import {SpinnerService} from "../../../spinner/spinner.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  selectItems: SelectItem[] = [
    {
      title: 'Друзья',
      value: SELECT_ITEM.FRIENDS
    },
    {
      title: 'Все пользователи',
      value: SELECT_ITEM.ALL,
    }
  ];

  userList: UserListItem[] = [];

  private selectedCategory: SelectItem;

  constructor(private userListService: UserListService,
              private spinner: SpinnerService) {}

  ngOnInit(): void {}

  trySearch() {
    this.userListService.getUserList(this.selectedCategory.value).pipe(take(1)).subscribe(users => {
      this.userList = users;

      this.spinner.hide();
    });
  }

  changeUsersCategory(selectedCategory: SelectItem) {
    this.spinner.show();

    this.selectedCategory = selectedCategory;

    this.trySearch();
  }

  deleteFromList(user: User) {
    this.userList.splice(this.userList.indexOf(user), 1);
  }

}
