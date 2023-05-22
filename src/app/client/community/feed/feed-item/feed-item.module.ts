import {NgModule} from "@angular/core";
import {FeedItemComponent} from "./feed-item.component";
import {SharedModule} from "../../../../_shared/shared.module";
import {CommonModule} from "@angular/common";
import { IsHeightMoreDirective } from './is-height-more.directive';

@NgModule({
  declarations: [
    FeedItemComponent,
    IsHeightMoreDirective
  ],
  exports: [
    FeedItemComponent
  ],
  imports: [
    SharedModule,
    CommonModule
  ]
})
export class FeedItemModule {}
