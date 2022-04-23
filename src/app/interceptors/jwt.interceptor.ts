import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthenticationService} from "../_services/authentication.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.authUser) {
      const token = this.authService.authUser.token;

      const request = req.clone({
        setHeaders: {
          'X-Auth-Token': token
        }
      });

      return next.handle(request);
    }

    return next.handle(req);
  }
}
