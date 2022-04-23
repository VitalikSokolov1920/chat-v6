import {SafeUrl} from "@angular/platform-browser";

export class User {
  id: string;
  first_name: string;
  last_name: string;
  image?: string | SafeUrl;
  token: string;
}
