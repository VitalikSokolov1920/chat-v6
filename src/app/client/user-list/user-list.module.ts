import {NgModule} from "@angular/core";
import {UserListComponent} from "./user-list/user-list.component";
import {UserListItemComponent} from "./user-list-item/user-list-item.component";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../_shared/shared.module";

@NgModule({
  declarations: [UserListComponent, UserListItemComponent],
  imports: [CommonModule, SharedModule],
  exports: [UserListComponent, UserListItemComponent],
})
export class UserListModule {}
