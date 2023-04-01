import { Router } from "express";
import { meController } from "../controllers/accounts.controllers";
import passport from "passport";
import isAuthMiddleware from "../middlewares/isAuth.middelware";

export const accountsRouter = Router();

accountsRouter.get("/me/", isAuthMiddleware, meController);
