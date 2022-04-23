import {InjectionToken, ModuleWithProviders, NgModule} from "@angular/core";
import {Socket, SocketConfig} from "./socket";
import {AuthenticationService} from "../_services/authentication.service";

export const SOCKET = new InjectionToken<Socket>('Socket Token');

@NgModule()
export class SocketModule {
  static forRoot(config: SocketConfig): ModuleWithProviders<SocketModule> {
    return {
      ngModule: SocketModule,
      providers : [
        {
          provide: SocketConfig,
          useValue: config
        },
        {
          provide: SOCKET,
          deps: [SocketConfig, AuthenticationService],
          useFactory: (config: SocketConfig, authService: AuthenticationService) => new Socket(config, authService)
        }
      ]
    }
  }
}
