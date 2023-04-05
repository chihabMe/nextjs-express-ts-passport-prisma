import { authRouter } from "../routes/auth.routes";
import bodyParser from "body-parser";
import errorsMiddleware from "../middlewares/errors.middleware";
import sessionMiddleware from "../middlewares/session.middleware";
import express, { Express, Request, Response, Router } from "express";
import "../config/passport";
import passport from "passport";
import notFoundMiddleware from "../middlewares/notFound.middleware";
import { accountsRouter } from "../routes/accounts.routes";
import next from "next";
import { parse } from "url";
import helmet from "helmet";
import morgan from "morgan";

export const createServer = async () => {
  const app = express();
  await setUpApp(app);
  return app;
};
export const createApiServer = () => {
  const app = express();
  registerMiddlewares(app);
  registerRoutes(app);
  registerErrorsMiddlewares(app);
  return app;
};
const registerRoutes = (app: Express) => {
  const apiRouter = Router();
  //regiser the api routes
  apiRouter.use(helmet());
  apiRouter.use("/auth/", authRouter);
  apiRouter.use("/accounts/", accountsRouter);

  //register the api router
  app.use("/api/", apiRouter);
};
const registerMiddlewares = (app: Express) => {
  app.use(
    morgan("tiny", {
      skip: (req, _) => req.originalUrl.startsWith("/_next/"),
    })
  );
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(sessionMiddleware);
  app.use(passport.initialize());
  app.use(passport.session());
};
const registerErrorsMiddlewares = (app: Express) => {
  app.use(errorsMiddleware);
  app.use(notFoundMiddleware);
};
const setUpApp = async (app: Express) => {
  const dev = process.env.NODE_ENV != "production";
  console.log("dev?", dev);
  const nextApp = next({ dev });
  const handle = nextApp.getRequestHandler();
  await nextApp.prepare().then(() => {
    registerMiddlewares(app);
    registerRoutes(app);
    app.get("*", (req, res) => {
      const url = parse(req.url, true);
      return handle(req, res, url);
    });
    registerErrorsMiddlewares(app);
  });
};
