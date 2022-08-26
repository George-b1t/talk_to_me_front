import { UserPlus } from "phosphor-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectedCurrentRoom } from "../../context/redux/slices/roomSlice";
import { ModalAddUser } from "../ModalAddUser";
import styles from "./styles.module.scss";

function RoomHeader() {
  const currentRoom = useSelector(selectedCurrentRoom);

  const [isOpenModalAddUser, setIsOpenModalAddUser] = useState(false);

  return (
    <div className={styles.container}>
      <h3>{currentRoom?.name ?? "Wellcome to talk to me"}</h3>

      <ModalAddUser
        isOpen={isOpenModalAddUser}
        onRequestClose={() => setIsOpenModalAddUser(false)}
      />

      {currentRoom && (
        <button onClick={() => setIsOpenModalAddUser(true)}>
          Adicionar <UserPlus size={19} color="#1a1a1a" weight="fill" />
        </button>
      )}
    </div>
  );
}

export { RoomHeader };
