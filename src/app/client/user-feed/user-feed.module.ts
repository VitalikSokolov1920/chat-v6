import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFeedComponent } from './user-feed/user-feed.component';
import {FeedItemModule} from "../community/feed/feed-item/feed-item.module";



@NgModule({
  declarations: [
    UserFeedComponent
  ],
  imports: [
    CommonModule,
    FeedItemModule
  ],
  exports: [
    UserFeedComponent
  ]
})
export class UserFeedModule { }
