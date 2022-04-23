import {Component, Inject, OnInit} from '@angular/core';
import {Socket} from "../../socket/socket";
import {AuthenticationService} from "../../_services/authentication.service";
import {Router} from "@angular/router";
import {SOCKET} from "../../socket/socket.module";
import {User} from "../../_models";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  private _showMobileMenu = false;

  set showMobileMenu(value: boolean) {
    this._showMobileMenu = value;
  }

  get showMobileMenu() {
    return this._showMobileMenu;
  }

  authUser: User;

  constructor(@Inject(SOCKET) private socket: Socket,
              private authService: AuthenticationService,
              private router: Router) {}

  ngOnInit(): void {
    this.authUser = this.authService.authUser;
  }

  logout() {
    this.showMobileMenu = false;

    this.socket.disconnect();
    this.authService.logout();

    this.router.navigate(['/login']);
  }

}
