import {forwardRef, Injectable} from "@angular/core";
import {UserListModule} from "./user-list.module";
import {SELECT_ITEM, UserListItem} from "../../_models";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  // providedIn: forwardRef(() => UserListModule)
  providedIn: 'root'
})
export class UserListService {
  constructor(private http: HttpClient) {}

  getUserList(category: SELECT_ITEM) {
    const params = {
      category
    };

    return this.http.get<UserListItem[]>(`${environment.apiUrl}/user-list`, { params });
  }
}
