import { Spinner } from "phosphor-react";
import { useSelector } from "react-redux";
import { selectedCurrentRoom } from "../../context/redux/slices/roomSlice";
import { useMessages } from "../../services/hooks/useMessages";
import { RoomInput } from "../RoomInput";
import { RoomMessages } from "../RoomMessages";
import styles from "./styles.module.scss";

function RoomContent() {
  const currentRoom = useSelector(selectedCurrentRoom);

  const { data, isLoading, isFetching, refetch, error } = useMessages(
    currentRoom?.id ?? 0
  );

  return (
    <div className={styles.container}>
      {isFetching && (
        <div className={styles.loadingMessages}>
          <Spinner size={32} color="#fcba03" />
        </div>
      )}
      <RoomMessages messages={data?.messages ?? []} />
      <RoomInput />
    </div>
  );
}

export { RoomContent };
