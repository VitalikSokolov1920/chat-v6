import {NgModule} from "@angular/core";
import {RegistrationComponent} from "./registration.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../_shared/shared.module";

@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    RegistrationComponent
  ]
})
export class RegistrationModule {}
