import {NgModule} from "@angular/core";
import {MembersListComponent} from "./members-list.component";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../_shared/shared.module";
import {UserListItemModule} from "../../user-list/user-list-item/user-list-item.module";

@NgModule({
  declarations: [
    MembersListComponent
  ],
  exports: [
    MembersListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserListItemModule
  ]
})
export class MembersListModule {}
