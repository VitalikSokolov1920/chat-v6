import {forwardRef, Inject, Injectable} from "@angular/core";
import {DialogModule} from "./dialog.module";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SOCKET} from "../../socket/socket.module";
import {Socket} from "../../socket/socket";
import {DialogListItem} from "../../_models";
import {environment} from "../../../environments/environment";
import {Message} from "../../_models";

@Injectable({
  providedIn: forwardRef(() => DialogModule)
})
export class DialogService {
  constructor(private http: HttpClient,
              @Inject(SOCKET) private socket: Socket) {}

  getDialogListItems() {
    return this.http.get<DialogListItem[]>(`${environment.apiUrl}/dialog-list`);
  }

  waitMessage$(): Observable<Message> {
    return this.socket.on<Message>('message');
  }

  waitChangeLastMessage$() {
    return this.socket.on<DialogListItem>('changeLastMessage');
  }

  sendMessage(messageText: string, sendFromId: string, sendToId: string) {
    const params = {
      send_from_id: sendFromId,
      send_to_id: sendToId,
      message_text: messageText,
    };

    this.socket.emitOnce<Message>('sendMessage', params);
  }

  getDialog$<T>(dialogId: string): Observable<T> {
    const params = {
      id: dialogId
    };

    return this.http.get<T>(`${environment.apiUrl}/dialog`, {params});
  }
}
