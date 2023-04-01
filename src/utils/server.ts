import { authRouter } from "../routes/auth.routes";
import bodyParser from "body-parser";
import errorsMiddleware from "../middlewares/errors.middleware";
import authMiddleware from "../middlewares/auth.middleware";
import sessionMiddleware from "../middlewares/session.middleware";
import express, { Express, Request, Response, Router } from "express";
import "../config/passport";
import passport from "passport";
import notFoundMiddleware from "../middlewares/notFound.middleware";
import { accountsRouter } from "../routes/accounts.routes";

export const createServer = () => {
  const app = express();
  setUpApp(app);
  return app;
};
const registerRoutes = (app: Express) => {
  app.use("/auth/", authRouter);
  app.use("/accounts/", accountsRouter);
};
const registerMiddlewares = (app: Express) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(sessionMiddleware);
  app.use(passport.initialize());
  app.use(passport.session());
  app.use((req, res, next) => {
    console.log(req.session);
    console.log("user:", req.user);
    next();
  });
  //app.use(authMiddleware);
};
const setUpApp = (app: Express) => {
  registerMiddlewares(app);
  registerRoutes(app);
  app.use(errorsMiddleware);
  app.use(notFoundMiddleware);
};
