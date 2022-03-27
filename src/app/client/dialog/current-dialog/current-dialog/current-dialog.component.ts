import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-current-dialog',
  templateUrl: './current-dialog.component.html',
  styleUrls: ['./current-dialog.component.scss']
})
export class CurrentDialogComponent implements OnInit {

  // @ts-ignore
  authUser = { id: 0, first_name: 'Vitalik', last_name: 'Sokolov', image: null };
  // @ts-ignore
  otherUser = { id: 1, first_name: 'Test', last_name: 'User', image: null };

  dialog = [
    {
      message_text: 'message1',
      send_from_id: 0,
      send_to_id: 1,
      date_send: new Date(),
      is_read: true,
    },
    {
      message_text: 'message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2',
      send_from_id: 1,
      send_to_id: 0,
      date_send: new Date(),
      is_read: false,
    },
    {
      message_text: 'message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2message2',
      send_from_id: 0,
      send_to_id: 1,
      date_send: new Date(),
      is_read: true,
    },
  ]

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');


    })
  }

  get fullName() {
    return this.otherUser.last_name.trim() + ' ' + this.otherUser.first_name.trim();
  }

  sendMessage() {

  }

}
