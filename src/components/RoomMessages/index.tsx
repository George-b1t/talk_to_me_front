import { useEffect } from "react";
import { Message } from "../../utils/interfaces";
import styles from "./styles.module.scss";

interface RoomMessagesProps {
  messages: Message[];
}

function RoomMessages({ messages }: RoomMessagesProps) {
  useEffect(() => {
    const objDiv = document.getElementById("messagesFieldIdToScrollBottom");
    console.log(objDiv?.scrollHeight);
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
            style={message.author.id === 1 ? { alignSelf: "flex-end" } : {}}
            className={styles.message}
          >
            <strong>{message.author.nickname}</strong>
            <p>{message.content}</p>
          </div>
        );
      })}
      {messages.map((message) => {
        return (
          <div
            key={message.id}
            style={message.author.id === 1 ? { alignSelf: "flex-end" } : {}}
            className={styles.message}
          >
            <strong>{message.author.nickname}</strong>
            <p>{message.content}</p>
          </div>
        );
      })}
    </div>
  );
}

export { RoomMessages };
