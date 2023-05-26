import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DialogService} from "../dialog.service";
import {DialogListItem} from "../../../_models";
import {AuthenticationService} from "../../../_services/authentication.service";
import {SpinnerService} from "../../../spinner/spinner.service";
import {CurrentDialogComponent} from "../current-dialog/current-dialog/current-dialog.component";
import {FormControl} from "@angular/forms";
import {debounceTime} from "rxjs";
import {CreateRoomService} from "../create-room/create-room.service";
import {RoomService} from "../room.service";
import {ErrorService} from "../../../error/error.service";

@Component({
  selector: 'app-dialog-list',
  templateUrl: './dialog-list.component.html',
  styleUrls: ['./dialog-list.component.scss']
})
export class DialogListComponent implements OnInit, OnDestroy {

  dialogListItems: DialogListItem[] = [];

  dialogsLoad = false;

  searchControl: FormControl;

  constructor(private router: Router,
              private dialogService: DialogService,
              private spinner: SpinnerService,
              private createRoomService: CreateRoomService,
              private errorService: ErrorService,
              private roomService: RoomService,
              private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.searchControl = new FormControl('');

    this.searchControl.valueChanges.pipe(debounceTime(1000)).subscribe(value => {
      this.dialogService.getDialogListItems$(value).subscribe((dialogList) => {
        this.dialogListItems = dialogList;
      });
    });
    this.dialogService.getDialogListItems$().subscribe((dialogList) => {
      this.dialogListItems = dialogList;

      this.dialogsLoad = true;

      this.spinner.hide();

      this.sort();
    });

    this.dialogService.waitUserOffline().subscribe((userId) => {
      const user = this.dialogListItems.find(item => {
        return item.id == userId;
      });

      if (user) {
        user.is_online = false;
      }
    });

    this.dialogService.waitUserOnline().subscribe((userId) => {
      const user = this.dialogListItems.find(item => {
        return item.id == userId;
      });

      if (user) {
        user.is_online = true;
      }
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

    this.roomService.waitChangeLastRoomMessage$().subscribe(message => {
      if (message) {
        const item = this.dialogListItems.find(item => item.room_id == message.room_id);

        item.last_message = message.last_message;
        item.timestamp = message.timestamp;
        item.unread_messages_amount = message.unread_messages_amount;

        this.sort();
      }
    })

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
        return item.id == unreadAmount.sendToId;
      });

      if (item) {
        item.unread_messages_amount = unreadAmount.unreadMessagesAmount;
      }
    });

    this.roomService.waitUpdateUnreadRoomMessagesAmount$().subscribe(result => {
      this.dialogListItems.find(item => item.room_id == result.roomId).unread_messages_amount = result.unreadMessagesAmount;
    });

    this.createRoomService.getLastCreatedRoomId().subscribe(id => {
      if (id) {
        this.createRoomService.getRoomById(id).subscribe(result => {
          if (result.actionResult) {
            const room = result.result;

            const dialogItem: DialogListItem = {
              room_id: room.room_id,
              room_name: room.room_name,
              last_message: room.last_message,
              unread_messages_amount: room.unread_messages_amount,
              id: '-1',
            };

            this.dialogListItems.unshift(dialogItem);
          } else {
            this.errorService.show(result.error);
          }
        });
      }
    });
  }

  // TODO: эта функция может запускаться только тогда, когда получен список диалогов DONE
  loadUserList(component: CurrentDialogComponent) {
    if (component instanceof CurrentDialogComponent) {
      const dialogId = component.activatedRoute.snapshot.paramMap.get('id');

      if (!this.dialogListItems) {
        this.dialogListItems = [];
      }

      const item = this.dialogListItems.find((item) => item.id == dialogId);

      if (item) {
        return;
      }

      this.dialogService.getDialogListItem$(dialogId).subscribe(item => {
        this.dialogListItems.unshift(item);
      });
    }
  }

  private sort() {
    this.dialogListItems.sort((a, b) => {
      const datea = new Date(a.timestamp);
      const dateb = new Date(b.timestamp);

      return datea > dateb ? -1 : 1;
    });
  }

  private clear() {
    this.dialogService.deleteEmptyDialogs().subscribe();
  }

  ngOnDestroy() {
    this.clear();
  }
}
