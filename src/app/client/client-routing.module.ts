import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MenuComponent} from "./menu/menu.component";
import {ClientPageComponent} from "./client-page/client-page/client-page.component";
import {UserListComponent} from "./user-list/user-list/user-list.component";

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: 'dialogs',
        loadChildren: () => import('./dialog/dialog.module').then(m => m.DialogModule),
      },
      {
        path: 'client-page',
        component: ClientPageComponent,
        data: { isAuthClientPage: true },
        children: [
          {
            path: ':id',
            component: ClientPageComponent,
            data: { isAuthClientPage: false },
          }
        ]
      },
      {
        path: 'users',
        component: UserListComponent
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
