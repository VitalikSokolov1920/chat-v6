import { Component, OnInit } from '@angular/core';
import {SpinnerService} from "../../../spinner/spinner.service";

@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.scss']
})
export class UserFeedComponent implements OnInit {

  constructor(private spinner: SpinnerService) { }

  ngOnInit(): void {
    this.spinner.hide();
  }

}
