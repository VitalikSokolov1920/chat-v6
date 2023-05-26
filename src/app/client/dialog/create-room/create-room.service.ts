import {forwardRef, Inject, Injectable} from '@angular/core';
import {DialogModule} from "../dialog.module";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {ActionResult, Image} from "../../../_models";
import {environment} from "../../../../environments/environment";
import {Friend} from "../../../_models/friend";
import {RoomListItem} from "../../../_models/room-list-item";
import {Socket} from "../../../socket/socket";
import {SOCKET} from "../../../socket/socket.module";

@Injectable({
  providedIn: forwardRef(() => DialogModule)
})
export class CreateRoomService {

  constructor(private http: HttpClient,
              @Inject(SOCKET) private socket: Socket) {
    this.waitNewRoomCreated();
  }

  private lastRoom = new BehaviorSubject<string>(null);

  getLastCreatedRoomId() {
    return this.lastRoom;
  }

  private waitNewRoomCreated() {
    this.socket.on<string>('newRoomCreated').subscribe(roomId => {
      if (roomId) {
        this.setLastCreatedRoomId(roomId);
      }
    })
  }

  setLastCreatedRoomId(id: string) {
    this.lastRoom.next(id);
  }

  getRoomById(id: string) {
    const params = {
      id
    };

    return this.http.get<ActionResult<RoomListItem>>(`${environment.apiUrl}/get-room`, {params});
  }

  getFriendList(): Observable<ActionResult<Friend[]>> {
    return this.http.get<ActionResult<Friend[]>>(`${environment.apiUrl}/get-friends`);
  }

  createRoom(name: string, member_ids: string[], image? : Image) {
    if (image) {
      return this.http.post<ActionResult<string>>(`${environment.apiUrl}/create-room`, {name, member_ids, image});
    } else {
      return this.http.post<ActionResult<string>>(`${environment.apiUrl}/create-room`, {name, member_ids});
    }
  }

  newRoomCreated$(roomId: string, socketMembersIds: string[]) {
    return this.socket.emitOnce<string>('newRoomCreated', {roomId, socketMembersIds});
  }
}




