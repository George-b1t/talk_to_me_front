import { Gear, Plus } from "phosphor-react";
import { useState } from "react";
import { ModalConfig } from "../ModalConfig";
import { ModalCreateRoom } from "../ModalCreateRoom";
import styles from "./styles.module.scss";

function AppMenu() {
  const [isOpenModalCreateRoom, setIsOpenModalCreateRoom] = useState(false);
  const [isOpenModalConfig, setIsOpenModalConfig] = useState(false);

  return (
    <>
      <ModalCreateRoom
        isOpen={isOpenModalCreateRoom}
        onRequestClose={() => setIsOpenModalCreateRoom(false)}
      />

      <ModalConfig
        isOpen={isOpenModalConfig}
        onRequestClose={() => setIsOpenModalConfig(false)}
      />

      <div className={styles.container}>
        <button
          className={styles.buttonNewRoom}
          onClick={() => setIsOpenModalCreateRoom(true)}
        >
          New Room <Plus color="#1a1a1a" size={18} />
        </button>

        <button
          className={styles.buttonConfig}
          onClick={() => setIsOpenModalConfig(true)}
        >
          <Gear size={22} color="#fcba03" />
        </button>
      </div>
    </>
  );
}

export { AppMenu };
