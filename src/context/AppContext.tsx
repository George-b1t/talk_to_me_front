import {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { User } from "../utils/interfaces";

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
    if (user) {
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
