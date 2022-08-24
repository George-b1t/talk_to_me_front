import { FormEvent, useContext, useState } from "react";

import { PaperPlaneRight } from "phosphor-react";

import styles from "./styles.module.scss";
import { api } from "../../services/api";
import { useSelector } from "react-redux";
import { selectedCurrentRoom } from "../../context/redux/slices/roomSlice";
import { AuthContext } from "../../context/AuthContext";

function RoomInput() {
  const currentRoom = useSelector(selectedCurrentRoom);
  const { user } = useContext(AuthContext);

  const [currentMessage, setCurrentMessage] = useState("");

  function handleSendMessage(e: FormEvent) {
    e.preventDefault();

    if (!currentMessage || !currentRoom || !user) return;

    api.post("/message/create", {
      room_id: currentRoom.id,
      user_id: user.id,
      content: currentMessage,
    });

    setCurrentMessage("");
  }

  return (
    <form onSubmit={handleSendMessage} className={styles.container}>
      <input
        type="text"
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
      />

      <button>
        <PaperPlaneRight type="submit" color="#fcba03" size={24} />
      </button>
    </form>
  );
}

export { RoomInput };
