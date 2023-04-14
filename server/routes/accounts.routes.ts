import { registerationSchema } from "../schemas/auth.schema";
import { Router } from "express";
import {
  meController,
  registerController,
} from "../controllers/accounts.controllers";
import isAuthMiddleware from "../middlewares/isAuth.middelware";
import zodValidatorMiddleware from "../middlewares/zod.body.validator.middleware";
import { prisma } from "../core/db";

export const accountsRouter = Router();

accountsRouter.get("/me/", isAuthMiddleware, meController);
accountsRouter.post("/register/", registerController);
