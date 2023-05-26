import {NgModule} from "@angular/core";
import {CurrentDialogComponent} from "./current-dialog/current-dialog.component";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../../_shared/shared.module";
import {MessageModule} from "./message/message.module";

@NgModule({
  declarations: [
    CurrentDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    MessageModule
  ],
  exports: [CurrentDialogComponent],
})
export class CurrentDialogModule {}
