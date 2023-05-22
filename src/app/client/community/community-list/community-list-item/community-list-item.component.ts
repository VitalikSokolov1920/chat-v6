import {Component, Input, OnInit} from '@angular/core';
import {CommunityListItem} from "../../../../_models/community-list-item";

@Component({
  selector: 'app-community-list-item',
  templateUrl: './community-list-item.component.html',
  styleUrls: ['./community-list-item.component.scss']
})
export class CommunityListItemComponent implements OnInit {
  @Input()
  community: CommunityListItem = {
    id: '1'
  } as CommunityListItem;

  constructor() { }

  ngOnInit(): void {
  }

}
