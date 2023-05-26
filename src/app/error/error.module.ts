import {NgModule} from "@angular/core";
import {ErrorComponent} from "./error.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    ErrorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ErrorComponent
  ]
})
export class ErrorModule {}
