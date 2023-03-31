import { SessionData } from "express-session";
import IUser from "../../interfaces/IUser";

declare module "express-session" {
  interface SessionData {
    lang: "en" | "ar" | "fr";
    isAuthenticated: boolean;
    user: IUser;
    views: number;
  }
}

export {};
// declare global {
//   namespace Express {
//     export interface Request {
//       session:Session&Partial<SessionData>&CustomFields
//     }
//   }
// }
