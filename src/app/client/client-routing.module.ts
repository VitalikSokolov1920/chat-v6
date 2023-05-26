import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MenuComponent} from "./menu/menu.component";
import {ClientPageComponent} from "./client-page/client-page/client-page.component";
import {UserListComponent} from "./user-list/user-list/user-list.component";
import {AuthGuard} from "../guards/auth.guard";
import {CommunityWrapperComponent} from "./community/community-wrapper/community-wrapper.component";
import {UserFeedComponent} from "./user-feed/user-feed/user-feed.component";
import {FriendRequestComponent} from "./user-list/friend-request/friend-request.component";

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'dialogs',
        loadChildren: () => import('./dialog/dialog.module').then(m => m.DialogModule),
      },
      {
        path: 'feed',
        component: UserFeedComponent
      },
      {
        path: 'client-page/:id',
        component: ClientPageComponent,
      },
      {
        path: 'users',
        children: [
          {
            path: 'list',
            component: UserListComponent
          },
          {
            path: 'friend-request',
            component: FriendRequestComponent
          }
        ],
      },
      {
        path: 'community',
        loadChildren: () => import('./community/community.module').then(m => m.CommunityModule),
      },
      {
        path: '**',
        redirectTo: 'dialogs',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {}
