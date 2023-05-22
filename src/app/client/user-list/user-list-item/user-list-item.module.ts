import {NgModule} from "@angular/core";
import {UserListItemComponent} from "./user-list-item.component";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../_shared/shared.module";

@NgModule({
  declarations: [
    UserListItemComponent
  ],
  exports: [
    UserListItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class UserListItemModule {}
