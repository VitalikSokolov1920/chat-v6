import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FeedItemModule} from "./feed-item/feed-item.module";
import { FeedComponent } from './feed/feed.component';



@NgModule({
  declarations: [
    FeedComponent
  ],
  imports: [
    CommonModule,
    FeedItemModule
  ]
})
export class FeedModule { }
