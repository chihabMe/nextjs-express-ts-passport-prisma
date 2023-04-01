import { Router } from "express";
import BaseController from "../utils/base.controller";
import { prisma } from "../core/db";
import { Request, Response, NextFunction } from "express";
import { createUserService, validateUser } from "../services/accounts.services";
import { hashPassword } from "../lib/auth.libs";
import httpStatus from "http-status";
interface accountsPostReqPropsInterface {
  email: string;
  username: string;
  password: string;
}

class AccountsController extends BaseController {
  objects = prisma.user.findMany();
  public async post(
    req: Request<any, any, accountsPostReqPropsInterface>,
    res: Response
  ) {
    try {
      const { email, username, password } = req.body;
      const { valid, errors } = await validateUser({ email, username });
      if (!valid) return res.status(400).json(errors);
      const user = await createUserService({
        email,
        username,
        password: hashPassword(password),
      });
      return res.status(201).json(user);
    } catch (err) {
      console.error(err);
      return res.status(403).json(err);
    }
  }
}

const accountsController = new AccountsController();

export const meController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password: _, ...user } = { ...req.user };
  return res.status(httpStatus.OK).json(user);
};
