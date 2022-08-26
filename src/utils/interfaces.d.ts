export interface User {
  id: number;
  name: string;
  nickname: string;
}

export interface Message {
  id: number;
  room_id: number;
  user_id: number;
  content: string;
  date: string;
  user: {
    nickname: string;
  };
}

export interface Room {
  id: number;
  name: string;
  is_private: boolean;
  Message: {
    id: number;
    room_id: number;
    user_id: number;
    content: string;
    date: string;
    user: {
      nickname: string;
    };
  }[];
}
