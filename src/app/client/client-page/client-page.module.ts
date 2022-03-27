import {NgModule} from "@angular/core";
import {ClientPageComponent} from "./client-page/client-page.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [ClientPageComponent],
  imports: [CommonModule],
  exports: [ClientPageComponent]
})
export class ClientPageModule {}
