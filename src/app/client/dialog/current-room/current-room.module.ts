import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentRoomComponent } from './current-room/current-room.component';
import {MessageModule} from "../current-dialog/message/message.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    CurrentRoomComponent
  ],
  imports: [
    CommonModule,
    MessageModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CurrentRoomModule { }
