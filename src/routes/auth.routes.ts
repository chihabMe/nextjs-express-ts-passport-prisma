import { Router } from "express";
import AuthController, {
  loginController,
  meController,
} from "../controllers/auth.controllers";

export const authRouter = Router();

const authController = new AuthController();
authRouter.all("", authController.all);
authRouter.post("/login/", loginController);
authRouter.get("/me/", meController);
