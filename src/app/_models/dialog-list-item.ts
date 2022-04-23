import {SafeUrl} from "@angular/platform-browser";

export class DialogListItem {
  last_name: string;
  first_name: string;

  image?: string | SafeUrl;

  timestamp: string;

  id: string;
  last_message: string;
  unread_messages_amount?: number;

  send_from_id?: string;
  send_to_id?: string;

  toSendingSocket?: boolean
}
