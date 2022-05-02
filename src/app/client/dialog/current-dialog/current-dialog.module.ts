import {NgModule} from "@angular/core";
import {CurrentDialogComponent} from "./current-dialog/current-dialog.component";
import {MessageComponent} from "./message/message.component";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../../_shared/shared.module";

@NgModule({
  declarations: [
    CurrentDialogComponent,
    MessageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
  exports: [CurrentDialogComponent, MessageComponent],
})
export class CurrentDialogModule {}
