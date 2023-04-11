import { Router } from "express";
import AuthController, {
  loginController,
  logoutController,
  socialLoginFialdController,
  socialLoginSuccessController,
} from "../controllers/auth.controllers";
import passport from "passport";
import zodValidatorMiddleware from "../middlewares/zod.body.validator.middleware";
import { loginSchema } from "../schemas/auth.schema";

export const authRouter = Router();

const authController = new AuthController();
authRouter.all("", authController.all);
authRouter.post(
  "/login/",
  zodValidatorMiddleware(loginSchema),
  loginController
);
// authRouter.post(
//   "/passport-login/",
//   passport.authenticate("local"),
//   (req, res) => {
//     res.status(200).json("you are logged in ");
//   }
// );
//

authRouter.get(
  "/with/google/",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);
authRouter.get(
  "/callback/google/",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/api/auth/social-login-fialed/",
  })
);

authRouter.get(
  "/with/facebook/",
  passport.authenticate("facebook", {
    scope: ["user_friends", "manage_pages"],
  })
);
authRouter.get(
  "/callback/facebook/",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/api/auth/social-login-fialed/",
  })
);

authRouter.get("/social-login-fialed/", socialLoginFialdController);

authRouter.post("/logout/", logoutController);
