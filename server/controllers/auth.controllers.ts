import { prisma } from "../core/db";
import User from "../models/user.model";
import BaseController from "../utils/base.controller";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const user = {
  name: "chihab",
  email: "chihab@email.com",
};

export default class AuthController extends BaseController {
  objects = user;

  public async get(req: Request, res: Response) {
    return res.status(200).json({ data: this.objects });
  }
}

export const loginController = async (
  req: Request<any, any, { email: string; password: string }>,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password)
    return res
      .status(httpStatus.BAD_REQUEST)
      .json("an email and password are requried");
  try {
    const { user, isValid } = await User.checkPassword({
      email,
      password,
    });
    if (!isValid || !user)
      return res.status(httpStatus.BAD_REQUEST).json("failled");

    req.login(user, (err) => res.status(200).json("you are logged in "));
  } catch (err) {
    next(err);
  }
};

export const logoutController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // req.session.user = undefined;
  // req.session.isAuthenticated = false;
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    return res.status(httpStatus.OK).json("logged out");
  });
};
