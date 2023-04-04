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
}

const initialState: AuthContextState = {
  isAuthenticated: false,
  loading: true,
  user: null,
  logout: () => null,
};
export const authContext = createContext(initialState);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const { loading, get, status, data } = useFetch<IUser>();
  const [user, setUser] = useState(initialState.user);

  const [isAuthenticated, setIsAuthenticated] = useState(
    initialState.isAuthenticated
  );
  const verify = () => {
    get({ url: profileEndpoint });
  };
  useEffect(() => {
    verify();
  }, []);
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };
  useEffect(() => {
    console.log("effect", data);
    if (!loading && status == 200) setIsAuthenticated(true);
    if (!loading && status == 200) setUser(data);
  }, [status, loading, data]);
  const value: AuthContextState = {
    isAuthenticated,
    loading,
    user,
    logout,
  };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};
