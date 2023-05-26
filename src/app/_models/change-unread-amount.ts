export class ChangeUnreadAmount {
  unreadMessagesAmount: number;
  sendFromId: string;
  sendToId: string;
}

export class ChangeRoomUnreadAmount {
  roomId: string;
  unreadMessagesAmount: number;
}
