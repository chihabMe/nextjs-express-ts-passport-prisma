import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { prisma } from "../core/db";
import { PrismaClient } from "@prisma/client";

const options = {
  host: process.env.DB_HOST ?? "",
  port: Number.parseInt(process.env.DB_PORT ?? "3306"),
  password: process.env.DB_PASS ?? "",
  user: process.env.DB_USER ?? "",
  database: process.env.DB_NAME ?? "",
};
//const sessionStores = new MySQLStore(options);

const sessionStore = new PrismaSessionStore(prisma, {
  checkPeriod: 2 * 60 * 1000, //ms
  dbRecordIdIsSessionId: true,
  dbRecordIdFunction: undefined,
});
const isProduction = process.env.NODE_ENV == "production";
const sessionMiddleware = session({
  secret: process.env.SECRET_KEY ?? "default",
  proxy: true,
  cookie: {
    maxAge: 60 * 60 * 24 * 15 * 1000,
    secure: isProduction,
    httpOnly: true,
    path: "/",
    signed: true,
    sameSite: isProduction ? "none" : "lax",
  },
  name: "session_id",
  store: sessionStore,
  resave: false,
  saveUninitialized: true,
});

export default sessionMiddleware;
