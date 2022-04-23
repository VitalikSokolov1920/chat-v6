import { CommonModule } from '@angular/common';
import {LOCALE_ID, NgModule} from '@angular/core';
import {ClientRoutingModule} from './client-routing.module';
import { MenuComponent } from './menu/menu.component';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import {ClientPageModule} from "./client-page/client-page.module";
import {UserListModule} from "./user-list/user-list.module";
import {SocketConfig} from "../socket/socket";
import {environment} from "../../environments/environment";
import {SocketModule} from "../socket/socket.module";
import {SharedModule} from "../_shared/shared.module";
import { MenuItemComponent } from './menu/menu-item/menu-item.component';

registerLocaleData(localeRu);

const socketConfig: SocketConfig = {
  maxReconnectAttempts: 5,
  autoReconnect: true,
  reconnect: true,
  url: `${environment.webSocketUrl}`,
  reconnectDelay: 2000
};

@NgModule({
  imports: [
    ClientRoutingModule,
    CommonModule,
    ClientPageModule,
    UserListModule,
    SocketModule.forRoot(socketConfig),
    SharedModule
  ],
  declarations: [
    MenuComponent,
    MenuItemComponent,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'ru'
    },
  ],
})
export class ClientModule {}
