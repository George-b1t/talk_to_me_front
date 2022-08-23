import { useState } from "react";

import { PaperPlaneRight } from "phosphor-react";

import styles from "./styles.module.scss";

function RoomInput() {
  const [currentMessage, setCurrentMessage] = useState("");

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
      />

      <button>
        <PaperPlaneRight color="#fcba03" size={24} />
      </button>
    </div>
  );
}

export { RoomInput };
