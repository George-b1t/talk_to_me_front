import { AppMenu } from "../../components/AppMenu";
import { RoomContent } from "../../components/RoomContent";
import { RoomHeader } from "../../components/RoomHeader";
import styles from "./styles.module.scss";
import { Rooms } from "../../components/Rooms";

function Dashboard() {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <AppMenu />
        <Rooms />
      </div>
      <div className={styles.rightContainer}>
        <RoomHeader />
        <RoomContent />
      </div>
    </div>
  );
}

export { Dashboard };
