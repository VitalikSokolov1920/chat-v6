import {SafeUrl} from "@angular/platform-browser";

export class DialogListItemInfo {
  send_from_id?: string;
  send_to_id?: string;
}

export class DialogListItem extends DialogListItemInfo{
  last_name: string;
  first_name: string;

  image?: string | SafeUrl;

  timestamp: string;

  id: string;
  last_message: string;
  unread_messages_amount?: number;

  toSendingSocket?: boolean
}
