import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CommunityWrapperComponent} from "./community-wrapper/community-wrapper.component";
import {CurrentCommunityComponent} from "./current-community/current-community.component";
import {CommunityListComponent} from "./community-list/community-list.component";
import {CreateCommunityComponent} from "./create-community/create-community.component";
import {MembersListComponent} from "./members-list/members-list.component";
import {FeedComponent} from "./feed/feed/feed.component";

const routes: Routes = [
  {
    path: '',
    component: CommunityWrapperComponent,
    children: [
      {
        path: 'all',
        component: CommunityListComponent,
        data: {
          type: 'all'
        }
      },
      {
        path: 'my',
        component: CommunityListComponent,
        data: {
          type: 'my'
        }
      },
      {
        path: 'create',
        component: CreateCommunityComponent
      },
      {
        path: ':id',
        component: CurrentCommunityComponent,
        children: [
          {
            path: 'feed',
            component: FeedComponent
          },
          {
            path: 'members',
            component: MembersListComponent
          }
        ]
      },
      {
        path: '**',
        redirectTo: 'all',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'all',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityRoutingModule {}
