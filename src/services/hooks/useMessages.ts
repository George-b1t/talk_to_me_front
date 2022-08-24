import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export async function getMessages(room_id: number) {
  if (room_id === 0) return { messages: [] };

  const { data } = await api.get("/message/listByRoom", {
    params: {
      room_id,
    },
  });

  console.log(data);

  return {
    messages: data.messages,
  };
}

export function useMessages(room: number) {
  return useQuery(["messages", room], () => getMessages(room), {
    staleTime: 1000 * 60 * 5,
  });
}
