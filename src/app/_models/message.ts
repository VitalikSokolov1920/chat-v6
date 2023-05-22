export class Message {
  id: string;
  message_text: string;
  timestamp: string;
  send_from_id: string;
  send_to_id: string; // 0, если сообщение в беседе
  is_read: boolean;
  room_id: string; // 0, если сообщение в диалоге
}
