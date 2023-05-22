import { Component, OnInit } from '@angular/core';
import {SpinnerService} from "../../../spinner/spinner.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-community-list',
  templateUrl: './community-list.component.html',
  styleUrls: ['./community-list.component.scss']
})
export class CommunityListComponent implements OnInit {

  type: string;

  constructor(private spinner: SpinnerService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.spinner.hide();

    this.type = this.route.snapshot.data['type'];
  }

}
