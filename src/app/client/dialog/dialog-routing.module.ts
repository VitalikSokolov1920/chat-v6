import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DialogListComponent} from "./dialog-list/dialog-list.component";
import {CurrentDialogComponent} from "./current-dialog/current-dialog/current-dialog.component";
import {CreateRoomComponent} from "./create-room/create-room.component";
import {CurrentRoomComponent} from "./current-room/current-room/current-room.component";

const routes: Routes = [
  {
    path: '',
    component: DialogListComponent,
    children: [
      {
        path: 'create-room',
        component: CreateRoomComponent
      },
      {
        path: 'room',
        children: [
          {
            path: ':id',
            component: CurrentRoomComponent,
            runGuardsAndResolvers: 'pathParamsChange'
          }
        ]
      },
      {
        path: ':id',
        component: CurrentDialogComponent,
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DialogRoutingModule {}
