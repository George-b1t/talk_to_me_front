import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppMenu } from "../../components/AppMenu";
import { RoomContent } from "../../components/RoomContent";
import { RoomHeader } from "../../components/RoomHeader";
import { AuthContext } from "../../context/AuthContext";
import { setCurrentRoom } from "../../context/redux/slices/roomSlice";
import { api } from "../../services/api";
import { Room } from "../../utils/interfaces";
import styles from "./styles.module.scss";

function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);

  const [rooms, setRooms] = useState<Room[]>([]);

  // const rooms = [
  //   {
  //     id: 1,
  //     name: "Frank",
  //     lastMessage: "Hello my name is Frank",
  //   },
  //   {
  //     id: 2,
  //     name: "Mike",
  //     lastMessage: "Hello my name is Mike",
  //   },
  //   {
  //     id: 3,
  //     name: "Larry",
  //     lastMessage: "Hello my name is Larry",
  //   },
  //   {
  //     id: 4,
  //     name: "Jesse",
  //     lastMessage: "Hello my name is Jesse",
  //   },
  //   {
  //     id: 5,
  //     name: "Kimberly",
  //     lastMessage: "Hello my name is Kimberly",
  //   },
  //   {
  //     id: 6,
  //     name: "Bob",
  //     lastMessage: "Hello my name is Bob",
  //   },
  //   {
  //     id: 7,
  //     name: "Mary",
  //     lastMessage: "Hello my name is Mary",
  //   },
  //   {
  //     id: 8,
  //     name: "Jhon",
  //     lastMessage: "Hello my name is Jhon",
  //   },
  //   {
  //     id: 9,
  //     name: "Keith",
  //     lastMessage: "Hello my name is Keith",
  //   },
  //   {
  //     id: 10,
  //     name: "Caio",
  //     lastMessage: "Hello my name is Caio",
  //   },
  //   {
  //     id: 11,
  //     name: "Cleyton",
  //     lastMessage: "Hello my name is Cleyton",
  //   },
  //   {
  //     id: 12,
  //     name: "Jhonathan",
  //     lastMessage: "Hello my name is Jhonathan",
  //   },
  //   {
  //     id: 13,
  //     name: "Kimberly",
  //     lastMessage: "Hello my name is Kimberly",
  //   },
  //   {
  //     id: 14,
  //     name: "Bob",
  //     lastMessage: "Hello my name is Bob",
  //   },
  //   {
  //     id: 15,
  //     name: "Lisa",
  //     lastMessage: "Hello my name is Lisa",
  //   },
  //   {
  //     id: 16,
  //     name: "Michael",
  //     lastMessage: "Hello my name is Michael",
  //   },
  //   {
  //     id: 17,
  //     name: "Lara",
  //     lastMessage: "Hello my name is Lara",
  //   },
  // ];

  useEffect(() => {
    if (!user) return;

    api
      .get("/room/listByUser", {
        params: {
          user_id: user?.id,
        },
      })
      .then((res) => {
        console.log(res.data);
        setRooms(res.data.rooms);
      });
  }, []);

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
