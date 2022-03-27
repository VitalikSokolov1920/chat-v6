import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss']
})
export class ClientPageComponent implements OnInit {
  isAuthClientPage: boolean;
  userImage: string;
  user: any = {
    first_name: 'Виталик',
    last_name: 'Соколов',
    is_friends: true,
  };

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.isAuthClientPage = this.activatedRoute.snapshot.data['isAuthClientPage'];
    this.userImage = 'assets/images/stub1.jpg';
  }

  get fullName() {
    return this.user.last_name.trim() + ' ' + this.user.first_name.trim();
  }

  navigateToDialog() {

  }

  addToFriends() {

  }

  removeFromFriends() {

  }


}
