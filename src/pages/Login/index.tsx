import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { api } from "../../services/api";
import { setLocalStorateUser } from "../../utils/localStorageManager";
import styles from "./styles.module.scss";

function Login() {
  const { setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: FormEvent) {
    e.preventDefault();

    api
      .post("/auth/login", {
        nickname,
        password,
      })
      .then((res) => {
        setUser(res.data.user);
        setLocalStorateUser(res.data.user);
        navigate("/dashboard");
      });
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.fieldLogin}>
        <h1>Login</h1>
        <div className={styles.fieldLoginItem}>
          <label htmlFor="nickname">Nickname</label>
          <input
            name="nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div className={styles.fieldLoginItem}>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export { Login };
