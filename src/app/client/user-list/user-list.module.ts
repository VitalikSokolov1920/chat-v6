import {NgModule} from "@angular/core";
import {UserListComponent} from "./user-list/user-list.component";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../_shared/shared.module";
import {UserListItemModule} from "./user-list-item/user-list-item.module";
import { FriendRequestComponent } from './friend-request/friend-request.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [UserListComponent, FriendRequestComponent],
    imports: [CommonModule, SharedModule, UserListItemModule, RouterModule],
  exports: [UserListComponent],
})
export class UserListModule {}
