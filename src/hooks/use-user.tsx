import { authContext } from "@/context/auth.context";
import { useContext } from "react";

const useUser = () => {
  const { user } = useContext(authContext);
  return user;
};

export default useUser;
