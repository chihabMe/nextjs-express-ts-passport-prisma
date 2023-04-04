import { registerationSchema } from "../../src/schemas/auth.schema";
import { Router } from "express";
import {
  meController,
  registerController,
} from "../controllers/accounts.controllers";
import isAuthMiddleware from "../middlewares/isAuth.middelware";
import zodValidatorMiddleware from "../middlewares/zod.body.validator.middleware";

export const accountsRouter = Router();

accountsRouter.get("/me/", isAuthMiddleware, meController);
accountsRouter.post(
  "/register/",
  zodValidatorMiddleware(registerationSchema),
  registerController
);
