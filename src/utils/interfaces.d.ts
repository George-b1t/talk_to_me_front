export interface User {
  id: number;
  name: string;
  nickname: string;
}

export interface Message {
  id: number;
  content: string;
  author: User;
}

export interface Room {
  id: number;
  name: string;
  lastMessage: string;
}
