import { AxiosError } from "axios";
import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Socket } from "socket.io-client";
import { api } from "../services/api";
import { User } from "../utils/interfaces";
import {
  getLocalStorageToken,
  getLocalStorageUser,
  setLocalStorageToken,
  setLocalStorageUser,
} from "../utils/localStorageManager";

interface AppContextData {
  user: User | null;
  setUser: (value: User | null) => void;
  socket: React.MutableRefObject<Socket | null>;
}

interface AppProviderProps {
  children: ReactNode;
}

export const AppContext = createContext({} as AppContextData);

export function AppProvider({ children }: AppProviderProps) {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);

  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    api.interceptors.response.use(
      (res) => res,
      (error: AxiosError) => {
        const data: any = error.response?.data;

        if (data.message === "Invalid token") {
          setLocalStorageToken("");
          setLocalStorageUser(null);
          setUser(null);
          navigate("/login");
        }

        toast(data.message, {
          type: "error",
        });

        return Promise.reject(error);
      }
    );
  }, []);

  useEffect(() => {
    const tempUser = getLocalStorageUser();
    const token = getLocalStorageToken();

    if (token && tempUser) {
      setUser(tempUser);
      api.defaults.headers.common["Authorization"] = "Bearer " + token;
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [window.location.pathname]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        socket,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
