import {Component, Input, OnInit} from '@angular/core';
import {Message, User} from "../../../../_models";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input()
  message: Message;
  @Input()
  sendFromUser: User;
  @Input()
  isAuthUserSend: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  getImageSrc() {
      if (this.sendFromUser.image) {
        return this.sendFromUser.image;
      } else {
        return 'assets/images/default-user-avatar.svg';
      }
  }
}
