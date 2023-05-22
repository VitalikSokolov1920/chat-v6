import {NgModule} from "@angular/core";
import {UserListComponent} from "./user-list/user-list.component";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../_shared/shared.module";
import {UserListItemModule} from "./user-list-item/user-list-item.module";

@NgModule({
  declarations: [UserListComponent],
  imports: [CommonModule, SharedModule, UserListItemModule],
  exports: [UserListComponent],
})
export class UserListModule {}
