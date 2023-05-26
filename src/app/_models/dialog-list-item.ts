import {SafeUrl} from "@angular/platform-browser";

export class DialogListItemInfo {
  send_from_id?: string;
  send_to_id?: string;
}

export class DialogListItem extends DialogListItemInfo{
  last_name?: string; // только для диалога
  first_name?: string; // только для диалога

  image?: string | SafeUrl;

  timestamp?: string;

  id?: string; // -1, если это беседа
  last_message?: string;
  unread_messages_amount?: number;

  is_online?: boolean; // только для диалогов

  room_id?: string; // -1, если это диалог
  room_name?: string; // только для бесед

  toSendingSocket?: boolean
}
