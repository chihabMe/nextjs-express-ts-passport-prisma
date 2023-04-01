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
    return res
      .status(200)
      .json({ data: this.objects, views: req.session.views });
  }
}

export const loginController = async (
  req: Request<any, any, { email: string; password: string }>,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const { user, isValid } = await User.checkPassword({
      email,
      password,
    });
    if (!isValid || !user) return res.status(400).json("failled");
    req.session.user = user;
    req.session.isAuthenticated = true;
    res.status(200).json("you are logged in ");
  } catch (err) {
    next(err);
  }
};

export const meController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password: _, ...user } = { ...req.session.user };
  return res.status(httpStatus.OK).json(user);
};
export const logoutController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // req.session.user = undefined;
  // req.session.isAuthenticated = false;
  return res.status(httpStatus.OK).json();
};
