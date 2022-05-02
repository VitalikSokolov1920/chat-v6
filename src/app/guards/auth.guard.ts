import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate, CanActivateChild,
  CanLoad,
  Route, Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import {AuthenticationService} from "../_services/authentication.service";
import {SpinnerService} from "../spinner/spinner.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad, CanActivateChild {

  constructor(private authService: AuthenticationService,
              private spinnerService: SpinnerService,
              private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    return this.activate();
  }

  canLoad(route: Route, segments: UrlSegment[]) {
    return this.activate();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.activate();
  }

  private activate() {
    this.spinnerService.show();
    if (this.authService.authUser && this.authService.authUser.token) {
      return true;
    } else {
      return this.router.parseUrl('/login');
    }
  }
}
