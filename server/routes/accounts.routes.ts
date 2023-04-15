import { Router } from "express";
import {
  meController,
  registerController,
  sendVerificationEmailController,
} from "../controllers/accounts.controllers";
import isAuthMiddleware from "../middlewares/isAuth.middelware";

export const accountsRouter = Router();

accountsRouter.get("/me/", isAuthMiddleware, meController);
accountsRouter.post("/register/", registerController);
accountsRouter.get(
  "/send-verification-email/",
  sendVerificationEmailController
);
