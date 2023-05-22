import {NgModule} from "@angular/core";
import {CommunityListComponent} from "./community-list.component";
import {CommunityListItemComponent} from "./community-list-item/community-list-item.component";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    RouterModule
  ],
  declarations: [
    CommunityListComponent,
    CommunityListItemComponent
  ],
  exports: [
    CommunityListComponent,
    CommunityListItemComponent
  ]
})
export class CommunityListModule {}
