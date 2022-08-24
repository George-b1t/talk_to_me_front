import { Plus } from "phosphor-react";
import { useState } from "react";
import { ModalCreateRoom } from "../ModalCreateRoom";
import styles from "./styles.module.scss";

function AppMenu() {
  const [isOpenModalCreateRoom, setIsOpenModalCreateRoom] = useState(false);

  return (
    <div className={styles.container}>
      <button onClick={() => setIsOpenModalCreateRoom(true)}>
        New Room <Plus color="#1a1a1a" size={18} />
      </button>
      <ModalCreateRoom
        isOpen={isOpenModalCreateRoom}
        onRequestClose={() => setIsOpenModalCreateRoom(false)}
      />
    </div>
  );
}

export { AppMenu };
