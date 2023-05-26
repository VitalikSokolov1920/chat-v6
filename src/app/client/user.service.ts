import {forwardRef, Injectable} from "@angular/core";
import {ClientModule} from "./client.module";
import {HttpClient} from "@angular/common/http";
import {ActionResult, Image, User} from "../_models";
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: forwardRef(() => ClientModule)
})
export class UserService {
  constructor(private http: HttpClient,
              private sanitizer: DomSanitizer) {
  }

  getUserById$(id: string) {
    const params = {
      id
    };

    return this.http.get<User>(`${environment.apiUrl}/user`, {params});
  }

  getUserImage$(id: string) {
    const params = {
      id
    };

    return this.http.get<Image>(`${environment.apiUrl}/image`, {params}).pipe(
      map(image => {
        if (image && image.type && image.data) {
          const path = `data:${image.type};base64, ${image.data}`;
          return this.sanitizer.bypassSecurityTrustUrl(path);
        } else {
          return 'assets/images/default-user-avatar.svg';
        }
      }),
    );
  }

  sendUserImage(image: Image) {
    return this.http.post<Image>(`${environment.apiUrl}/safe-image`, { image }).pipe(
      map(image => {
        if (image && image.type && image.data) {
          return this.sanitizer.bypassSecurityTrustUrl(`data:${image.type};base64, ${image.data}`);
        } else {
          return 'assets/images/default-user-avatar.svg';
        }
      })
    );
  }

  // отправить запрос в друзья(для отправителя)
  sendRequestToFriends$(id: string): Observable<ActionResult<boolean>> {
    return this.http.patch<ActionResult<boolean>>(`${environment.apiUrl}/add-friend-request`, { id });
  }

  // отменить запрос в друзья(и для отправителя, и для получателя)
  cancelFriendRequest$(requestFrom: string, requestTo: string): Observable<ActionResult<boolean>> {
    return this.http.patch<ActionResult<boolean>>(`${environment.apiUrl}/remove-friend-request`, { requestFrom, requestTo });
  }

  getFriendRequestsToUser$() {
    return this.http.get<ActionResult<User[]>>(`${environment.apiUrl}/friend-request-list-to-user`);
  }

  getFriendRequestsFromUser$() {
    return this.http.get<ActionResult<User[]>>(`${environment.apiUrl}/friend-request-list-from-user`);
  }

  // принять запрос в друзья
  applyFriendRequest$(requestToId: string, requestFromId: string) {
    const params = {
      requestToId,
      requestFromId
    };

    return this.http.post<ActionResult<boolean>>(`${environment.apiUrl}/apply-friend-request`, {...params});
  }

  removeFromFriends(userId: string) {
    return this.http.post<ActionResult<boolean>>(`${environment.apiUrl}/delete-from-friends`, {userId})
  }
}
