import {User} from "./user";

export class UserListItem extends User{
  is_friends?: boolean;
  is_requested_friends_from_auth_user?: boolean;
  is_requested_friends_to_auth_user?: boolean;
}
