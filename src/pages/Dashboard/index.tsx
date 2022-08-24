import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppMenu } from "../../components/AppMenu";
import { RoomContent } from "../../components/RoomContent";
import { RoomHeader } from "../../components/RoomHeader";
import { AppContext } from "../../context/AppContext";
import { setCurrentRoom } from "../../context/redux/slices/roomSlice";
import { api } from "../../services/api";
import { Room } from "../../utils/interfaces";
import io from "socket.io-client";
import styles from "./styles.module.scss";

function Dashboard() {
  const dispatch = useDispatch();
  let { user, socket } = useContext(AppContext);

  const [rooms, setRooms] = useState<Room[]>([]);

  const [ready, setReady] = useState(false);

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
        socket.current = io("http://localhost:3333");
        setReady(true);
      });
  }, []);

  useEffect(() => {
    if (ready && socket.current && user) {
      socket.current.emit("channel", user.id);
      socket.current.on("chat message", (message) => {
        console.log(message);
      });
    }
  }, [ready]);

  function handleSetCurrentRoom(room: Room) {
    dispatch(setCurrentRoom(room));
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <AppMenu />
        <div className={styles.listRooms}>
          {rooms.map((room) => (
            <button
              onClick={() => handleSetCurrentRoom(room)}
              key={room.id}
              className={styles.room}
            >
              <strong>{room.name}</strong>
              <p>{room.Message[0]?.content ?? "No messages"}</p>
            </button>
          ))}
        </div>
      </div>
      <div className={styles.rightContainer}>
        <RoomHeader />
        <RoomContent />
      </div>
    </div>
  );
}

export { Dashboard };
