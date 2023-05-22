import {forwardRef, Injectable} from '@angular/core';
import {DialogModule} from "../dialog.module";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, ReplaySubject} from "rxjs";
import {ActionResult, Image, User} from "../../../_models";
import {environment} from "../../../../environments/environment";
import {Friend} from "../../../_models/friend";
import {Room} from "../../../_models/room";

@Injectable({
  providedIn: forwardRef(() => DialogModule)
})
export class CreateRoomService {

  constructor(private http: HttpClient) {}

  private lastRoom = new BehaviorSubject<string>(null);

  getLastCreatedRoomId() {
    return this.lastRoom;
  }

  setLastCreatedRoomId(id: string) {
    this.lastRoom.next(id);
  }

  getRoomById(id: string) {
    const params = {
      id
    };

    return this.http.get<ActionResult<Room>>(`${environment.apiUrl}/get-room`, {params});
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
}




