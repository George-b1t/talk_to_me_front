import { FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { api } from "../../services/api";
import {
  getLocalStorageToken,
  getLocalStorageUser,
  setLocalStorageToken,
  setLocalStorageUser,
} from "../../utils/localStorageManager";
import styles from "./styles.module.scss";

function Login() {
  const { setUser } = useContext(AppContext);

  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const user = getLocalStorageUser();
    const token = getLocalStorageToken();

    if (token && user) {
      setUser(user);
      api.defaults.headers.common["Authorization"] = "Bearer " + token;
      navigate("/dashboard");
    }
  }, []);

  function handleLogin(e: FormEvent) {
    e.preventDefault();

    api
      .post("/auth/login", {
        nickname,
        password,
      })
      .then((res) => {
        setUser(res.data.user);
        api.defaults.headers.common["Authorization"] =
          "Bearer " + res.data.token;
        setLocalStorageUser(res.data.user);
        setLocalStorageToken(res.data.token);
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
        <button type="submit">Join</button>
      </form>
    </div>
  );
}

export { Login };
