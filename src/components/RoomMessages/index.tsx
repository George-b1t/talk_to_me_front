import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { Message } from "../../utils/interfaces";
import styles from "./styles.module.scss";

interface RoomMessagesProps {
  messages: Message[];
}

function RoomMessages({ messages }: RoomMessagesProps) {
  const { user } = useContext(AppContext);

  useEffect(() => {
    const objDiv = document.getElementById("messagesFieldIdToScrollBottom");
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }, [messages]);

  return (
    <div id="messagesFieldIdToScrollBottom" className={styles.container}>
      {messages.map((message) => {
        return (
          <div
            key={message.id}
            style={
              message.user_id === user?.id ? { alignSelf: "flex-end" } : {}
            }
            className={styles.message}
          >
            <strong>{message.user.nickname}</strong>
            <p>{message.content}</p>
          </div>
        );
      })}
    </div>
  );
}

export { RoomMessages };
