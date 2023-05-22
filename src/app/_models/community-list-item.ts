import {SafeUrl} from "@angular/platform-browser";

export class CommunityListItem {
  id: string;
  name: string;
  image: string | SafeUrl;
  member_amount: number;
}
