import { SessionData, Session } from "express-session";
import IUser from "../../interfaces/IUser";

declare global {
  namespace Express {
    interface User extends IUser {
      username: string;
    }
  }
}
export {};
