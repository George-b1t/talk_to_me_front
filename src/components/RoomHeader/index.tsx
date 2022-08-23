import { useSelector } from "react-redux";
import { selectedCurrentRoom } from "../../context/redux/slices/roomSlice";
import styles from "./styles.module.scss";

function RoomHeader() {
  const currentRoom = useSelector(selectedCurrentRoom);

  return (
    <div className={styles.container}>
      <h3>{currentRoom?.name}</h3>
    </div>
  );
}

export { RoomHeader };
