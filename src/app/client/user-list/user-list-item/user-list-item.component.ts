import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss']
})
export class UserListItemComponent implements OnInit {
  @Input()
  user: any;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToUserPage(id: any) {
    if (id == 'id авторизованного пользователя') {
      this.router.navigate(['client/client-page']);
    } else {
      this.router.navigate(['client/client-page', 1]);
    }
  }

  navigateToDialog(id: any) {

  }

  removeFromFriends(id: any) {

  }

  addToFriends(id: any) {

  }

}
