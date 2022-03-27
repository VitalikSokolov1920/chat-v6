import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DialogListComponent} from "./dialog-list/dialog-list.component";
import {CurrentDialogComponent} from "./current-dialog/current-dialog/current-dialog.component";

const routes: Routes = [
  {
    path: '',
    component: DialogListComponent,
    children: [
      {
        path: ':id',
        component: CurrentDialogComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dialogs',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DialogRoutingModule {}
