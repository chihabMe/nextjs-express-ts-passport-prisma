import { SessionData } from "express-session";
import IUser from "../../interfaces/IUser";

declare module "express-session" {
  interface SessionData {
    lang: "en" | "ar" | "fr";
  }
}

export {};
