import { Component, OnInit } from '@angular/core';
import {SpinnerService} from "../../../spinner/spinner.service";

@Component({
  selector: 'app-community-wrapper',
  templateUrl: './community-wrapper.component.html',
  styleUrls: ['./community-wrapper.component.scss']
})
export class CommunityWrapperComponent implements OnInit {

  constructor(private spinner: SpinnerService) {}

  ngOnInit(): void {
    this.spinner.hide();
  }

}
