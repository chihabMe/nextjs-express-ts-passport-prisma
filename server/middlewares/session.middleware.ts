import session from "express-session";
import MySQLSessionStore from "express-mysql-session";

//@ts-ignore
const MySQLStore = MySQLSessionStore(session);

const options = {
  host: process.env.DB_HOST ?? "",
  port: Number.parseInt(process.env.DB_PORT ?? "3306"),
  password: process.env.DB_PASS ?? "",
  user: process.env.DB_USER ?? "",
  database: process.env.DB_NAME ?? "",
};
const sessionStore = new MySQLStore(options);
const sessionMiddleware = session({
  secret: process.env.SECRET_KEY ?? "default",
  cookie: {
    maxAge: 60 * 60 * 24 * 15 * 1000,
    secure: process.env.NODE_ENV == "production",
    httpOnly: true,
    path: "/",
    signed: true,
  },
  name: "session_id",
  store: sessionStore,
  resave: false,
  saveUninitialized: true,
});

export default sessionMiddleware;
