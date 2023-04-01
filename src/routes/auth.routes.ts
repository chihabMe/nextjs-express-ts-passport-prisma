import { Router } from "express";
import AuthController, {
  loginController,
  logoutController,
  meController,
} from "../controllers/auth.controllers";
import protectedMiddleware from "../middlewares/protected.middleware";
import passport from "passport";

export const authRouter = Router();

const authController = new AuthController();
authRouter.all("", authController.all);
authRouter.post("/login/", loginController);
authRouter.post("/passport-login/", passport.authenticate("local"),(req,res)=>{
  res.status(200).json("you are logged in ")
}
);

authRouter.get("/me/", protectedMiddleware, meController);
authRouter.post("/logout/", logoutController);
