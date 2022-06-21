import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DialogService} from "../dialog.service";
import {DialogListItem} from "../../../_models";
import {AuthenticationService} from "../../../_services/authentication.service";
import {SpinnerService} from "../../../spinner/spinner.service";
import {CurrentDialogComponent} from "../current-dialog/current-dialog/current-dialog.component";

@Component({
  selector: 'app-dialog-list',
  templateUrl: './dialog-list.component.html',
  styleUrls: ['./dialog-list.component.scss']
})
export class DialogListComponent implements OnInit, OnDestroy {
  isDialogSelected = false;

  dialogListItems: DialogListItem[];

  constructor(private router: Router,
              private dialogService: DialogService,
              private spinner: SpinnerService,
              private authService: AuthenticationService) {
    if (sessionStorage.getItem('isDialogSelected')) {
      this.isDialogSelected = sessionStorage.getItem('isDialogSelected') === 'true';
    }
  }

  ngOnInit(): void {
    this.dialogService.getDialogListItems$().subscribe((dialogList) => {
      this.dialogListItems = dialogList;

      this.spinner.hide();
    });

    this.dialogService.waitChangeLastMessage$().subscribe(lastMessage => {
      this.dialogListItems.forEach((item, index) => {
        if (lastMessage.toSendingSocket) {
          if (lastMessage.send_to_id == item.id && lastMessage.send_from_id == this.authService.authUser.id) {
            const newItem = this.dialogListItems[index];

            newItem.timestamp = lastMessage.timestamp;
            newItem.last_message = lastMessage.last_message;
            newItem.unread_messages_amount = lastMessage.unread_messages_amount;

            this.dialogListItems[index] = newItem;

            return;
          }
        } else {
          if (lastMessage.send_from_id == item.id && lastMessage.send_to_id == this.authService.authUser.id) {
            const newItem = this.dialogListItems[index];

            newItem.timestamp = lastMessage.timestamp;
            newItem.last_message = lastMessage.last_message;
            newItem.unread_messages_amount = lastMessage.unread_messages_amount;

            this.dialogListItems[index] = newItem;

            return;
          }
        }
      });

      this.sort();
    });

    this.dialogService.waitMessage$().subscribe((message) => {
      const item = this.dialogListItems.find((item) => item.id == message.send_from_id);

      if (!item && this.authService.authUser.id != message.send_from_id) {
        this.dialogService.getDialogListItem$(message.send_from_id).subscribe((item) => {
          this.dialogListItems.push(item);

          this.sort();
        });
      }
    });

    this.dialogService.waitUpdateUnreadMessagesAmount$().subscribe(unreadAmount => {
      const item = this.dialogListItems.find((item) => {
        return item.id == unreadAmount.sendFromId;
      });

      const index = this.dialogListItems.indexOf(item);

      this.dialogListItems[index].unread_messages_amount = unreadAmount.unreadMessagesAmount;
    })
  }

  loadUserList(component: CurrentDialogComponent) {
    const dialogId = component.activatedRoute.snapshot.paramMap.get('id');

    const item = this.dialogListItems.find((item) => item.id == dialogId);

    if (item) {
      return;
    }

    this.dialogService.getDialogListItem$(dialogId).subscribe(item => {
      if (!this.dialogListItems) {
        this.dialogListItems = [];
      }

      this.dialogListItems.unshift(item);
    })
  }

  set dialogSelected(isSelected: boolean) {
    sessionStorage.setItem('isDialogSelected', String(isSelected));

    this.isDialogSelected = isSelected;
  }

  backToDialogs() {
    this.dialogSelected = false;
    this.router.navigate(['client/dialogs']);
  }

  private sort() {
    this.dialogListItems.sort((a, b) => {
      const datea = new Date(a.timestamp);
      const dateb = new Date(b.timestamp);

      return datea > dateb ? -1 : 1;
    });
  }

  private clear() {
    this.dialogSelected = false;

    this.dialogService.deleteEmptyDialogs().subscribe();
  }

  ngOnDestroy() {
    this.clear();
  }

}
