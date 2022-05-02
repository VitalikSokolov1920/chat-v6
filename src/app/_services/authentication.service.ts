import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs";
import {User} from "../_models";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private user: User;

  get authUser() {
    if (!this.user) {
      const userJson = sessionStorage.getItem('authUser');
      this.user = JSON.parse(userJson);
    }
    return this.user;
  }

  set authUser(user: User) {
    if (user) {
      this.user = user;

      sessionStorage.setItem('authUser', JSON.stringify(this.user));
    }
  }

  constructor(private http: HttpClient) {}

  /**
   * Нужно сообщить обоим серверам, что пользователь вышел.
   * Так же нужно на фронте
   */
  logout() {
    this.http.delete(`${environment.apiUrl}/logout`, { responseType: 'text' }).subscribe();

    this.clear();
  }

  private clear() {
    sessionStorage.clear();

    this.user = null;
  }

  authorize(login: string, password: string) {
    const params = {
      login,
      password,
    };

    return this.http.get<User>(`${environment.apiUrl}/login`, { params })
      .pipe(
        map(user => {
          if (!user) {
            return null;
          } else {
            this.authUser = user;

            return user;
          }
        }),
      );
  }

  registrationUser(userInfo: object) {
    return this.http.post<User>(`${environment.apiUrl}/register`, {...userInfo}).pipe(
      map(user => {
        this.authUser = user;

        return user;
      })
    );
  }
}
