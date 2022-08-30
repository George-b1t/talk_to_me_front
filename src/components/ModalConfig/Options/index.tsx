import { useState } from "react";
import styles from "./styles.module.scss";

function ModalConfigOptions() {
  const [selectedOption, setSelectedOption] = useState("General");

  return (
    <div className={styles.container}>
      <button
        className={selectedOption === "General" ? styles.on : ""}
        onClick={() => setSelectedOption("General")}
      >
        General
      </button>
      <button
        className={selectedOption === "User" ? styles.on : ""}
        onClick={() => setSelectedOption("User")}
      >
        User
      </button>
    </div>
  );
}

export { ModalConfigOptions };
