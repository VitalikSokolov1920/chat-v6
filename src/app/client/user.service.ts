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

  addToFriends$(id: string): Observable<ActionResult> {
    return this.http.patch<ActionResult>(`${environment.apiUrl}/add-friend`, { id });
  }

  removeFromFriends$(id: string): Observable<ActionResult> {
    return this.http.patch<ActionResult>(`${environment.apiUrl}/remove-friend`, { id });
  }
}
