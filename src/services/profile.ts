import { profileEndpoint } from "@/config/endpoints";
import IUser from "../../server/interfaces/IUser";
import { axiosClientInstance } from "../helpers/axios";

export const getProfileService = () => {
  return axiosClientInstance.get<IUser>(profileEndpoint);
};
