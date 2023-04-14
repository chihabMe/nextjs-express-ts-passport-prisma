import { prisma } from "../core/db";
import User from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import IJSonResponse from "../interfaces/IJsonResponse";
import { loginSchema } from "../schemas/auth.schema";

export const loginController = async (
  req: Request<any, any, { email: string; password: string }>,
  res: Response,
  next: NextFunction
) => {
  let jsonResponse: IJSonResponse<null>;
  try {
    const { email, password } = loginSchema.parse(req.body);
    const { user, isValid } = await User.checkPassword({
      email,
      password,
    });
    if (!isValid || !user) {
      jsonResponse = {
        message: "invalid email or password ",
        status: "error",
        statusCode: httpStatus.BAD_REQUEST,
        errors: {
          email: "Invalid",
          password: "Invalid",
        },
      };
      return res.status(jsonResponse.statusCode).json(jsonResponse);
    }
    jsonResponse = {
      message: "you are logged in",
      status: "success",
      statusCode: httpStatus.OK,
    };
    return req.logIn(user, (err) => {
      if (err) {
        next(err);
      }
      return res.status(jsonResponse.statusCode).json(jsonResponse);
    });
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

export const socialLoginSuccessController = (req: Request, res: Response) => {
  const jsonResponse: IJSonResponse<null> = {
    message: "you are logged in ",
    status: "success",
    statusCode: httpStatus.OK,
  };
  return res.status(jsonResponse.statusCode).json(jsonResponse);
};
export const socialLoginFialdController = (req: Request, res: Response) => {
  const jsonResponse: IJSonResponse<null> = {
    message: "social login failed",
    status: "error",
    statusCode: httpStatus.BAD_REQUEST,
  };
  return res.status(jsonResponse.statusCode).json(jsonResponse);
};
