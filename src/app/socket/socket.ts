import { io } from 'socket.io-client';
import {ReplaySubject} from 'rxjs';
import {AuthenticationService} from "../_services/authentication.service";

export class SocketConfig {
  url: string;
  reconnect: boolean;
  autoReconnect: boolean;
  maxReconnectAttempts: number;
  reconnectDelay: number;
}

export class Socket {
  private io;

  constructor(config: SocketConfig, private authService: AuthenticationService) {
    this.io = io(config.url, {
      reconnection: config.reconnect,
      reconnectionDelayMax: config.reconnectDelay,
      reconnectionDelay: config.reconnectDelay,
      autoConnect: config.autoReconnect,
      reconnectionAttempts: config.maxReconnectAttempts
    });

    this.io.on('userId', () => {
      const user = this.authService.authUser;

      const params = {
        id: user.id,
        token: user.token
      };

      this.io.emit('userId', params);
    });
  }

  private tryConnect() {
    if (this.io.disconnected) {
      this.io.connect();

      const user = this.authService.authUser;

      const params = {
        id: user.id,
        token: user.token
      };

      this.io.emit('userId', params);
    }
  }

  private tryDisconnect() {
    if (this.io.connected) {
      this.io.disconnect();
    }
  }

  disconnect() {
    this.tryDisconnect();
  }

  emitWithoutOn<T>(eventName: string, data?: any) {
    this.tryConnect();

    if (!data) {
      data = {};
    }

    data.token = this.authService.authUser.token;

    this.io.emit(eventName, data);
  }

  emit<T>(eventName: string, data?: any) {
    this.tryConnect();

    if (!data) {
      data = {};
    }
    data.token = this.authService.authUser.token;

    const resultSubject$ = new ReplaySubject<T>(1);

    this.io.emit(eventName, data).on(eventName, (result: T) => {
      resultSubject$.next(result);
    });

    return resultSubject$;
  }

  emitOnce<T>(eventName: string, data?: any) {
    this.tryConnect();

    if (!data) {
      data = {};
    }

    data.token = this.authService.authUser.token;

    const resultSubject$ = new ReplaySubject<T>(1);

    this.io.emit(eventName, data).once(eventName, (result: T) => {
      resultSubject$.next(result);
    });

    return resultSubject$;
  }

  on<T>(eventName: string) {
    this.tryConnect();

    const resultSubject$ = new ReplaySubject<T>(1);

    this.io.on(eventName, (result: T) => {
      resultSubject$.next(result);
    });

    return resultSubject$;
  }
}
