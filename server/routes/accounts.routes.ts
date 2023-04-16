import { Router } from "express";
import {
  meController,
  registerController,
  sendVerificationEmailController,
  verifyVerificationLinkController,
} from "../controllers/accounts.controllers";
import isAuthMiddleware from "../middlewares/isAuth.middelware";

export const accountsRouter = Router();

accountsRouter.get("/me/", isAuthMiddleware, meController);
accountsRouter.post("/register/", registerController);
accountsRouter.get(
  "/send-verification-email/",
  sendVerificationEmailController
);
accountsRouter.get("/verify/:userId/:token", verifyVerificationLinkController);
