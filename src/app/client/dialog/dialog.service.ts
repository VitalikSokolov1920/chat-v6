import {forwardRef, Inject, Injectable} from "@angular/core";
import {DialogModule} from "./dialog.module";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SOCKET} from "../../socket/socket.module";
import {Socket} from "../../socket/socket";
import {AllMessagesRead, ChangeUnreadAmount, DialogListItem} from "../../_models";
import {environment} from "../../../environments/environment";
import {Message} from "../../_models";
import {SliceParamsRequest, SliceParamsResponse} from "../../_models/slice-params";

@Injectable({
  providedIn: forwardRef(() => DialogModule)
})
export class DialogService {
  constructor(private http: HttpClient,
              @Inject(SOCKET) private socket: Socket) {}

  getDialogListItems$(search?: string) {
    if (!search) {
      return this.http.get<DialogListItem[]>(`${environment.apiUrl}/dialog-list`);
    } else {
      const params = {
        search
      };
      return this.http.get<DialogListItem[]>(`${environment.apiUrl}/dialog-list`, { params });
    }
  }

  getDialogListItem$(dialogItemId: string) {
    const params = {
      dialogId: dialogItemId
    };

    return this.http.get<DialogListItem>(`${environment.apiUrl}/dialog-list-item`, { params });
  }

  waitMessage$(): Observable<Message> {
    return this.socket.on<Message>('message');
  }

  waitChangeLastMessage$() {
    return this.socket.on<DialogListItem>('changeLastMessage');
  }

  waitUpdateUnreadMessagesAmount$() {
    return this.socket.on<ChangeUnreadAmount>('changeUnreadMessagesAmount');
  }

  waitAllMessagesRead() {
    return this.socket.on<AllMessagesRead>('allMessagesRead');
  }

  waitUserOffline() {
    return this.socket.on<string>("userOffline");
  }

  waitUserOnline() {
    return this.socket.on<string>("userOnline");
  }

  sendMessage(messageText: string, sendFromId: string, sendToId: string) {
    const params = {
      send_from_id: sendFromId,
      send_to_id: sendToId,
      message_text: messageText,
    };

    return this.socket.emitOnce<Message>('sendMessage', params);
  }

  getDialog$(dialogId: string, sliceParams: SliceParamsRequest): Observable<SliceParamsResponse<Message>> {
    const params = {
      id: dialogId,
        ...sliceParams
    };

    return this.http.get<SliceParamsResponse<Message>>(`${environment.apiUrl}/dialog`, {params});
  }

  getDialogMessagesCount(dialogId: string) {
    const params = {
      id: dialogId
    };

    return this.http.get<any>(`${environment.apiUrl}/dialog-messages-count`, { params });
  }

  // markAllMessagesAsRead(otherUserId: string) {
  //   return this.socket.emitOnce('allMessagesRead', { otherUserId });
  // }

  markMessageRead(messageId: string, sendFromId: string, sendToId: string) {
    return this.socket.emitOnce<string>('messageRead', { messageId, sendFromId, sendToId });
  }

  waitMessageRead() {
    return this.socket.on<string>('messageRead');
  }

  deleteEmptyDialogs() {
    return this.http.delete<void>(`${environment.apiUrl}/delete-empty-dialogs`);
  }
}
