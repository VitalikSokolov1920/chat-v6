import {NgModule} from "@angular/core";
import {DialogListComponent} from "./dialog-list/dialog-list.component";
import {DialogListItemComponent} from "./dialog-list/dialog-list-item/dialog-list-item.component";
import {DialogRoutingModule} from "./dialog-routing.module";
import {CommonModule} from "@angular/common";
import {CurrentDialogModule} from "./current-dialog/current-dialog.module";
import {ReactiveFormsModule} from "@angular/forms";
import { CreateRoomComponent } from './create-room/create-room.component';
import {SharedModule} from "../../_shared/shared.module";

@NgModule({
  declarations: [
    DialogListComponent,
    DialogListItemComponent,
    CreateRoomComponent,
  ],
    imports: [
        DialogRoutingModule,
        CommonModule,
        CurrentDialogModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class DialogModule {}
