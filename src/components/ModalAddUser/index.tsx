import { X } from "phosphor-react";
import { FormEvent, useContext, useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";
import { selectedCurrentRoom } from "../../context/redux/slices/roomSlice";
import { api } from "../../services/api";
import styles from "./styles.module.scss";

interface ModalAddUserProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

function ModalAddUser({ isOpen, onRequestClose }: ModalAddUserProps) {
  const currentRoom = useSelector(selectedCurrentRoom);
  const { user, socket } = useContext(AppContext);

  const [nickname, setNickname] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setNickname("");
    }
  }, [isOpen]);

  function handleCreateRoom(e: FormEvent) {
    e.preventDefault();

    if (!user || !currentRoom) return;

    api
      .post("/room/linkUser", {
        room_id: currentRoom.id,
        user_id_from: user.id,
        nickname,
      })
      .then(() => {
        if (!socket.current) return;

        socket.current.emit("new_room_user", {
          room: currentRoom,
          nickname,
        });
        onRequestClose();
      })
      .catch((err) => {
        toast(err.response.data.message, {
          type: "error",
        });
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
        <h2>Add User</h2>

        <form onSubmit={handleCreateRoom} className={styles.formAddUser}>
          <div className={styles.formItem}>
            <label>Nickname</label>
            <input
              name="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>

          <button type="submit">Add</button>
        </form>
      </div>
    </ReactModal>
  );
}

export { ModalAddUser };
