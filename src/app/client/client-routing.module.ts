import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MenuComponent} from "./menu/menu.component";
import {ClientPageComponent} from "./client-page/client-page/client-page.component";
import {UserListComponent} from "./user-list/user-list/user-list.component";
import {AuthGuard} from "../guards/auth.guard";

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
        path: 'client-page/:id',
        component: ClientPageComponent,
      },
      {
        path: 'users',
        component: UserListComponent
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
