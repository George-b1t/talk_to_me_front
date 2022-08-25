import { Spinner } from "phosphor-react";
import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppContext } from "../../context/AppContext";
import { selectedCurrentRoom } from "../../context/redux/slices/roomSlice";
import { useMessages } from "../../services/hooks/useMessages";
import { Message } from "../../utils/interfaces";
import styles from "./styles.module.scss";

function RoomMessages() {
  const currentRoom = useSelector(selectedCurrentRoom);

  const { user } = useContext(AppContext);

  const { data, isFetching } = useMessages(currentRoom?.id ?? 0);

  useEffect(() => {
    const objDiv = document.getElementById("messagesFieldIdToScrollBottom");
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }, [data]);

  return (
    <div id="messagesFieldIdToScrollBottom" className={styles.container}>
      {isFetching && (
        <div className={styles.loadingMessages}>
          <Spinner size={32} color="#fcba03" />
        </div>
      )}

      {data?.messages.map((message: Message) => {
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
