import { Component, OnInit } from '@angular/core';
import {SpinnerService} from "../../../spinner/spinner.service";

@Component({
  selector: 'app-current-community',
  templateUrl: './current-community.component.html',
  styleUrls: ['./current-community.component.scss']
})
export class CurrentCommunityComponent implements OnInit {

  constructor(private spinner: SpinnerService) {}

  ngOnInit(): void {
    this.spinner.hide();
  }

}
