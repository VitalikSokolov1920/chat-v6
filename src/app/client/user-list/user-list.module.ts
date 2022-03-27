import {NgModule} from "@angular/core";
import {UserListComponent} from "./user-list/user-list.component";
import {UserListItemComponent} from "./user-list-item/user-list-item.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [UserListComponent, UserListItemComponent],
  imports: [CommonModule],
  exports: [UserListItemComponent, UserListComponent],
})
export class UserListModule {}
