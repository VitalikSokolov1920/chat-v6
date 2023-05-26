import {NgModule} from "@angular/core";
import {MessageComponent} from "./message.component";
import {CommonModule} from "@angular/common";
import {VisibleDirective} from "./visible.directive";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    MessageComponent,
    VisibleDirective
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MessageComponent,
    VisibleDirective
  ]
})
export class MessageModule {}
