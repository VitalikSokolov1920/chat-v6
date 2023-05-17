import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DialogListItem} from "../../../../_models";
import {DialogService} from "../../dialog.service";
import {ReplaySubject} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";
import {UserService} from "../../../user.service";

@Component({
  selector: 'app-dialog-list-item',
  templateUrl: './dialog-list-item.component.html',
  styleUrls: ['./dialog-list-item.component.scss']
})
export class DialogListItemComponent implements OnInit, OnDestroy {
  @Input()
  dialogListItem: DialogListItem;

  private unsubscribe$ = new ReplaySubject(1);

  constructor(private dialogService: DialogService,
              private sanitizer: DomSanitizer,
              private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserImage$(this.dialogListItem.id).subscribe(image => {
        this.dialogListItem.image = image;
    });
  }

  get unreadAmount() {
    return this.dialogListItem.unread_messages_amount > 99 ? '99+' : this.dialogListItem.unread_messages_amount;
  }

  get fullName() {
    return this.dialogListItem.last_name.trim() + ' ' + this.dialogListItem.first_name.trim();
  }

  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
