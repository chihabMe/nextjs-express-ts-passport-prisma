import useFetch from "@/hooks/use-fetch";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import IUser from "../../server/interfaces/IUser";
import { profileEndpoint } from "../config/endpoints";

interface AuthContextState {
  isAuthenticated: boolean;
  loading: boolean;
  user: IUser | null;
  logout: () => void;
  done: boolean;
  login: () => void;
}

const initialState: AuthContextState = {
  isAuthenticated: false,
  loading: true,
  user: null,
  logout: () => null,
  login: () => null,
  done: false,
};
export const authContext = createContext(initialState);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const { loading, done, get, status, data } = useFetch<IUser>();
  const [user, setUser] = useState(initialState.user);

  const [isAuthenticated, setIsAuthenticated] = useState(
    initialState.isAuthenticated
  );
  const verify = () => {
    get({ url: profileEndpoint });
  };
  const login = () => {
    verify();
  };
  useEffect(() => {
    verify();
  }, []);
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };
  useEffect(() => {
    if (!loading && status == 200) setIsAuthenticated(true);
    if (!loading && status == 200) setUser(data);
  }, [status, loading, data]);
  const value: AuthContextState = {
    isAuthenticated,
    loading,
    user,
    logout,
    done,
    login,
  };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};
