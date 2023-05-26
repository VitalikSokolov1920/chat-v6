import {forwardRef, Inject, Injectable} from '@angular/core';
import {DialogModule} from "./dialog.module";
import {HttpClient} from "@angular/common/http";
import {
  ActionResult,
  ActionResultSliceParamsResponse,
  ChangeRoomUnreadAmount,
  DialogListItem,
  Image,
  Message,
  User
} from "../../_models";
import {environment} from "../../../environments/environment";
import {map} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";
import {Room} from "../../_models/room-list-item";
import {SliceParamsRequest} from "../../_models/slice-params";
import {Socket} from "../../socket/socket";
import {SOCKET} from "../../socket/socket.module";

@Injectable({
  providedIn: forwardRef(() => DialogModule)
})
export class RoomService {

  constructor(private http: HttpClient,
              @Inject(SOCKET) private socket: Socket,
              private sanitizer: DomSanitizer) {}

  getRoomImage$(roomId: string) {
    const params = {
      roomId
    };

    return this.http.get<ActionResult<Image>>(`${environment.apiUrl}/room-image`, {params}).pipe(
      map(result => {
        if (result.actionResult) {
          const path = `data:${result.result.type};base64, ${result.result.data}`;

          return this.sanitizer.bypassSecurityTrustUrl(path);
        } else {
          return 'assets/images/default-user-avatar.svg';
        }
      })
    );
  }

  getCurrentRoomInfoById$(id: string) {
    const params = {
      roomId: id
    };

    return this.http.get<ActionResult<Room>>(`${environment.apiUrl}/current-room-info`, {params})
  }

  getRoomMembers$(roomId: string) {
    const params = {
      roomId: roomId
    };

    return this.http.get<ActionResult<User[]>>(`${environment.apiUrl}/room-members`, {params});
  }

  getRoomMessages$(roomId: string, sliceParams: SliceParamsRequest) {
    const params = {
      roomId: roomId,
        ...sliceParams
    };

    return this.http.get<ActionResultSliceParamsResponse<Message[]>>(`${environment.apiUrl}/room-messages`, {params});
  }

  getRoomMessagesCount$(roomId: string) {
    const params = {
      roomId: roomId
    };

    return this.http.get<ActionResult<{unreadMessagesCount: number, messagesCount: number}>>(`${environment.apiUrl}/room-messages-count`, {params});
  }

  sendMessage$(messageText: string, sendFromId: string, roomId: string) {
    const params = {
      sendFromId: sendFromId,
      roomId: roomId,
      messageText: messageText,
    };

    return this.socket.emitOnce<Message>('sendRoomMessage', params);
  }

  markMessageRead$(messageId: string, sendFromId: string, roomId: string, msgSendFromId: string) {
    return this.socket.emitOnce<void>('roomMessageRead', { messageId, sendFromId, roomId, msgSendFromId });
  }

  waitMessageRead$() {
    return this.socket.on<string>('readRoomMessage');
  }

  waitMessage$() {
    return this.socket.on<Message>('roomMessageSend');
  }

  waitChangeLastRoomMessage$() {
    return this.socket.on<DialogListItem>('changeLastRoomMessage');
  }

  waitUpdateUnreadRoomMessagesAmount$() {
    return this.socket.on<ChangeRoomUnreadAmount>('changeUnreadRoomMessagesAmount');
  }

  getUnreadMessagesCount(roomId: string) {
    const params = {
      roomId
    };

    return this.http.get<number>(`${environment.apiUrl}/unread-messages-count-room`, {params});
  }
}




