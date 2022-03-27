import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dialog-list-item',
  templateUrl: './dialog-list-item.component.html',
  styleUrls: ['./dialog-list-item.component.scss']
})
export class DialogListItemComponent implements OnInit {
  @Input()
  dialogListItem: any;

  constructor() {}

  ngOnInit(): void {
  }

  getImageSrc() {
    if (this.dialogListItem.image) {
      return this.dialogListItem.image;
    } else {
      return 'assets/images/default-user-avatar.svg';
    }
  }

  get fullName() {
    return this.dialogListItem.last_name.trim() + ' ' + this.dialogListItem.first_name.trim();
  }

  getOnlineStatus() {
    return this.dialogListItem.isOnline ? 'В сети' : 'Не в сети'
  }

}
