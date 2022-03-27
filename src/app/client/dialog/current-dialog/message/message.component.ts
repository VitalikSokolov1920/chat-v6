import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input()
  message: any;
  @Input()
  sendFromUser: any;
  @Input()
  isAuthUserSend: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  getImageSrc(id: number) {
    if (id == this.sendFromUser.id) {
      if (this.sendFromUser.image) {
        return this.sendFromUser.image;
      } else {
        return 'assets/images/default-user-avatar.svg';
      }
    }
  }
}
