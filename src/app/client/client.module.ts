import { CommonModule } from '@angular/common';
import {LOCALE_ID, NgModule} from '@angular/core';
import {ClientRoutingModule} from './client-routing.module';
import { MenuComponent } from './menu/menu.component';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import {ClientPageModule} from "./client-page/client-page.module";
import {UserListModule} from "./user-list/user-list.module";

registerLocaleData(localeRu);

@NgModule({
  imports: [
    ClientRoutingModule,
    CommonModule,
    ClientPageModule,
    UserListModule
  ],
  declarations: [
    MenuComponent,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'ru'
    }
  ],
})
export class ClientModule {}
