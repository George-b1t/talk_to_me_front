import { Spinner } from "phosphor-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectedCurrentRoom } from "../../context/redux/slices/roomSlice";
import { useMessages } from "../../services/hooks/useMessages";
import { queryClient } from "../../services/queryClient";
import { Message } from "../../utils/interfaces";
import { RoomInput } from "../RoomInput";
import { RoomMessages } from "../RoomMessages";
import styles from "./styles.module.scss";

function RoomContent() {
  const currentRoom = useSelector(selectedCurrentRoom);

  return (
    <div className={styles.container}>
      {currentRoom && (
        <>
          <RoomMessages />
          <RoomInput />
        </>
      )}
    </div>
  );
}

export { RoomContent };
