import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export async function getMessages(roomId: number) {
  const { data } = await api.get("/messages", {
    params: {
      roomId,
    },
  });

  return {
    messages: data.messages,
  };
}

export function useMessages(room: number) {
  return useQuery(["messages", room], () => getMessages(room), {
    staleTime: 1000 * 60 * 5,
  });
}
