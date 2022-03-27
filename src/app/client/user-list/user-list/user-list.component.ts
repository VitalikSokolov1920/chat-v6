import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  userList = [
    {
      first_name: 'Test',
      last_name: 'User',
      image: 'assets/images/stub1.jpg',
      is_friends: true,
      is_online: true,
    },
    {
      first_name: 'Usersrdasd',
      last_name: 'ASdasdasd',
      image: 'assets/images/stub2.jpg',
      is_friends: false,
      is_online: false,
    },
    {
      first_name: 'a',
      last_name: 's',
      image: 'assets/images/stub3.jpg',
      is_friends: false,
      is_online: true,
    },
    {
      first_name: 'sssssssssssswQ',
      last_name: 'QSdasdsAD',
      image: 'assets/images/stub2.jpg',
      is_friends: true,
      is_online: false,
    },
    {
      first_name: 'aasd',
      last_name: 'ddasd',
      image: 'assets/images/stub4.jpg',
      is_friends: false,
      is_online: true,
    },
    {
      first_name: 'aasdasd',
      last_name: 'asdadadasdasdaww',
      image: 'assets/images/stub1.jpg',
      is_friends: true,
      is_online: false,
    },
    {
      first_name: 'aasdasd',
      last_name: 'asdadadasdasdaww',
      image: 'assets/images/stub1.jpg',
      is_friends: true,
      is_online: false,
    },
    {
      first_name: 'aasdasd',
      last_name: 'asdadadasdasdaww',
      image: 'assets/images/stub4.jpg',
      is_friends: true,
      is_online: false,
    },
    {
      first_name: 'aasdasd',
      last_name: 'asdadadasdasdaww',
      image: 'assets/images/stub1.jpg',
      is_friends: true,
      is_online: false,
    },
  ]

  constructor() {}

  ngOnInit(): void {
  }

}
