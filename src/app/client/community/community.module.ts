import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityWrapperComponent } from './community-wrapper/community-wrapper.component';
import { CurrentCommunityComponent } from './current-community/current-community.component';
import {CommunityRoutingModule} from "./community-routing.module";
import { CreateCommunityComponent } from './create-community/create-community.component';
import {SharedModule} from "../../_shared/shared.module";
import {MembersListModule} from "./members-list/members-list.module";
import {CommunityListModule} from "./community-list/community-list.module";
import {FeedModule} from "./feed/feed.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    CommunityWrapperComponent,
    CurrentCommunityComponent,
    CreateCommunityComponent,
  ],
    imports: [
        CommonModule,
        CommunityRoutingModule,
        SharedModule,
        FeedModule,
        MembersListModule,
        CommunityListModule,
        ReactiveFormsModule
    ]
})
export class CommunityModule { }
