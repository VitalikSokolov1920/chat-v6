import {NgModule} from "@angular/core";
import {CustomSelectComponent} from "./custom-select/custom-select.component";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import { CustomImagePickerComponent } from './custom-image-picker/custom-image-picker.component';
import {CloseOnEventDirective} from "./close-on-event.directive";

@NgModule({
  declarations: [
    CustomSelectComponent,
    CustomImagePickerComponent,
    CloseOnEventDirective,
  ],
  exports: [
    CustomSelectComponent,
    CustomImagePickerComponent,
    CloseOnEventDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
})
export class SharedModule {}
