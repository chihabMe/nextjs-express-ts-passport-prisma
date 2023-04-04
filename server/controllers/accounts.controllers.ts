import { Request, Response, NextFunction } from "express";
import { createUserService, validateUser } from "../services/accounts.services";
import { hashPassword } from "../lib/auth.libs";
import httpStatus from "http-status";
import IJSonResponse from "../interfaces/IJsonResponse";
import IUser from "../interfaces/IUser";
import { TypeOf } from "zod";
import { registerationSchema } from "../schemas/auth.schema";

export const registerController = async (
  req: Request<any, any, TypeOf<typeof registerationSchema>>,
  res: Response,
  next: NextFunction
) => {
  try {
    let jsonRespone: IJSonResponse<IUser>;

    const { email, username, password } = req.body;
    const { valid, errors } = await validateUser({ email, username });

    if (!valid) {
      jsonRespone = {
        message: "invalid fields",
        status: "error",
        statusCode: httpStatus.BAD_REQUEST,
        errors,
      };
      return res.status(jsonRespone.statusCode).json(jsonRespone);
    }
    const user = await createUserService({
      email,
      username,
      password: hashPassword(password),
    });
    const { password: _, ...userWithOutPasssword } = { ...user };
    jsonRespone = {
      message: "registerd",
      status: "success",
      statusCode: httpStatus.CREATED,
      data: userWithOutPasssword as IUser,
    };
    return res.status(jsonRespone.statusCode).json(jsonRespone);
  } catch (err) {
    next(err);
  }
};

export const meController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password: _, ...user } = { ...req.user };
  return res.status(httpStatus.OK).json(user);
};
