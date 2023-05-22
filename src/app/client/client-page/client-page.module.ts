import {NgModule} from "@angular/core";
import {ClientPageComponent} from "./client-page/client-page.component";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../_shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {FeedItemModule} from "../community/feed/feed-item/feed-item.module";

@NgModule({
  declarations: [ClientPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FeedItemModule
  ],
  exports: [ClientPageComponent]
})
export class ClientPageModule {}
