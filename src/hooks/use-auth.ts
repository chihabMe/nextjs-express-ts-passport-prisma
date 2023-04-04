import { authContext } from "@/context/auth.context";
import { useContext } from "react";

const useAuth = () => {
  return useContext(authContext);
};
export default useAuth;
