import { Lock, LockOpen, X } from "phosphor-react";
import { FormEvent, useContext, useEffect, useState } from "react";
import ReactModal from "react-modal";
import { AppContext } from "../../context/AppContext";
import { api } from "../../services/api";
import styles from "./styles.module.scss";

interface ModalCreateRoomProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

function ModalCreateRoom({ isOpen, onRequestClose }: ModalCreateRoomProps) {
  const { user, socket } = useContext(AppContext);

  const [name, setName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setIsPrivate(false);
    }
  }, [isOpen]);

  function handleCreateRoom(e: FormEvent) {
    e.preventDefault();

    if (!user) return;

    api
      .post("/room/create", {
        name,
        is_private: isPrivate,
        user_id: user.id,
      })
      .then((res) => {
        if (!socket.current) return;

        socket.current.emit("new_room", {
          room: res.data.content.createdRoom,
        });
        onRequestClose();
      });
  }

  return (
    <ReactModal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <X color="#fff" size={30} />
      </button>
      <div className={styles.container}>
        <h2>Create a new Room</h2>

        <form onSubmit={handleCreateRoom} className={styles.formCreateRoom}>
          <div className={styles.formItem}>
            <label>Name</label>
            <input
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.formItem}>
            <label>Private</label>
            {isPrivate ? (
              <button type="button" onClick={() => setIsPrivate(false)}>
                <Lock color="#1a1a1a" size={22} /> Yes
              </button>
            ) : (
              <button type="button" onClick={() => setIsPrivate(true)}>
                <LockOpen color="#1a1a1a" size={22} /> No
              </button>
            )}
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </ReactModal>
  );
}

export { ModalCreateRoom };
