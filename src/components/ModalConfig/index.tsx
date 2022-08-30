import { X } from "phosphor-react";
import ReactModal from "react-modal";
import { ModalConfigOptions } from "./Options";
import styles from "./styles.module.scss";
import { UserConfig } from "./UserConfig";

interface ModalConfigProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

function ModalConfig({ isOpen, onRequestClose }: ModalConfigProps) {
  return (
    <ReactModal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content react-modal-content-large"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <X color="#fff" size={30} />
      </button>
      <div className={styles.container}>
        <h2>Settings</h2>

        <div className={styles.content}>
          <ModalConfigOptions />
          <UserConfig />
        </div>
      </div>
    </ReactModal>
  );
}

export { ModalConfig };
