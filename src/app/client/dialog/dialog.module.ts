import {NgModule} from "@angular/core";
import {DialogListComponent} from "./dialog-list/dialog-list.component";
import {DialogListItemComponent} from "./dialog-list/dialog-list-item/dialog-list-item.component";
import {DialogRoutingModule} from "./dialog-routing.module";
import {CommonModule} from "@angular/common";
import {CurrentDialogModule} from "./current-dialog/current-dialog.module";

@NgModule({
  declarations: [
    DialogListComponent,
    DialogListItemComponent,
  ],
  imports: [
    DialogRoutingModule,
    CommonModule,
    CurrentDialogModule
  ]
})
export class DialogModule {}
