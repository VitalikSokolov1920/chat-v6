import { Component, OnInit } from '@angular/core';
import {SpinnerService} from "../../../spinner/spinner.service";
import {User} from "../../../_models";

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss']
})
export class MembersListComponent implements OnInit {

  userList: User[];

  constructor(private spinner: SpinnerService) { }

  ngOnInit(): void {
    this.spinner.hide();
  }

  trySearch() {

  }

}
