import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { host } from "../../../host";
import { AppContext } from "../../context/AppContext";
import { setCurrentRoom } from "../../context/redux/slices/roomSlice";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { Message, Room } from "../../utils/interfaces";
import styles from "./styles.module.scss";

function Rooms() {
  const dispatch = useDispatch();
  let { user, socket } = useContext(AppContext);

  const [rooms, setRooms] = useState<Room[]>([]);

  const [ready, setReady] = useState(false);

  const sortedRooms = () => {
    const tempRooms = [...rooms];
    tempRooms
      .sort(
        (a, b) =>
          (a.Message[0]
            ? new Date(a.Message[0].date).getSeconds()
            : new Date().getSeconds()) -
          (b.Message[0]
            ? new Date(b.Message[0].date).getSeconds()
            : new Date().getSeconds())
      )
      .reverse();

    return tempRooms;
  };

  useEffect(() => {
    if (!user) return;

    api
      .get("/room/listByUser", {
        params: {
          user_id: user?.id,
        },
      })
      .then((res) => {
        setRooms(res.data.rooms);
        socket.current = io(`http://${host}:3333`);
        setReady(true);
      });
  }, []);

  useEffect(() => {
    if (ready && socket.current && user) {
      socket.current.emit("rooms", user.id);
      socket.current.on("room", (room) => {
        console.log(room);

        setRooms((oldValue) => {
          return [...oldValue, room];
        });
      });
      socket.current.on("chat message", (message) => {
        toast(`${message.user.nickname} said ${message.content}`);

        queryClient.setQueryData(
          ["messages", message.room_id],
          (oldData: any) => {
            if (!oldData) return;

            let data: {
              messages: Message[];
            } = {
              messages: [],
            };

            data.messages = [...oldData.messages, message];

            return data;
          }
        );

        setRooms((oldValue) => {
          const newValue = [
            ...oldValue.map((value) => {
              if (value.id === message.room_id) {
                return {
                  ...value,
                  Message: [message],
                };
              }

              return value;
            }),
          ];

          return newValue;
        });
      });
    }
  }, [ready]);

  function handleSetCurrentRoom(room: Room) {
    dispatch(setCurrentRoom(room));
  }

  return (
    <div className={styles.container}>
      {sortedRooms().map((room) => (
        <button
          onClick={() => handleSetCurrentRoom(room)}
          key={room.id}
          className={styles.room}
        >
          <strong>{room.name}</strong>
          <p>
            {room.Message[0]?.content
              ? `${room.Message[0]?.user.nickname}: ${room.Message[0]?.content}`
              : "No messages"}
          </p>
        </button>
      ))}
    </div>
  );
}

export { Rooms };
