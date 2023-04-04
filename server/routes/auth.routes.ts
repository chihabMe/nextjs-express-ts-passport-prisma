import { Router } from "express";
import AuthController, {
  loginController,
  logoutController,
} from "../controllers/auth.controllers";
import passport from "passport";
import zodValidatorMiddleware from "../middlewares/zod.body.validator.middleware";
import { loginSchema } from "../../src/schemas/auth.schema";

export const authRouter = Router();

const authController = new AuthController();
authRouter.all("", authController.all);
authRouter.post(
  "/login/",
  zodValidatorMiddleware(loginSchema),
  loginController
);
authRouter.post(
  "/passport-login/",
  passport.authenticate("local"),
  (req, res) => {
    res.status(200).json("you are logged in ");
  }
);

authRouter.post("/logout/", logoutController);
