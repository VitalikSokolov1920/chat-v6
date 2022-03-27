import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  showMobileMenu = false;

  constructor() { }

  ngOnInit(): void {
  }

  logout() {
    this.showMobileMenu = false;
  }

}
