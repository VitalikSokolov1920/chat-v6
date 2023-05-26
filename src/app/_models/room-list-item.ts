import {Image} from "./image";
import {Message} from "./message";
import {User} from "./user";

export class RoomListItem {
  room_id: string;
  room_name: string;
  last_message: string;
  image?: Image;
  unread_messages_amount: number;
}

export class Room extends RoomListItem{
  roomMembersCount: number;
  messages: Message[];
  members: User[];
  roomMessagesCount: number;
}
