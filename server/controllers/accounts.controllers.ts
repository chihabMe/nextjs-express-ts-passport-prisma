import { Request, Response, NextFunction } from "express";
import {
  createUserService,
  findUserByEmail,
  generateAVerificatinoTokenService,
  generateAVerificationLink,
  generateVerificationEmailService,
  validateUser,
} from "../services/accounts.services";

import { hashPassword } from "../lib/auth.libs";

import httpStatus from "http-status";

import IJSonResponse from "../interfaces/IJsonResponse";
import IUser from "../interfaces/IUser";
import { TypeOf } from "zod";

import { registerationSchema } from "../schemas/auth.schema";
import { errorResponse } from "../utils/json.response";
import { sendVerificationEmailSchema } from "../schemas/accounts.schemas";

export const registerController = async (
  req: Request<any, any, TypeOf<typeof registerationSchema>>,
  res: Response,
  next: NextFunction
) => {
  try {
    let jsonRespone: IJSonResponse<IUser>;

    const { email, username, password } = registerationSchema.parse(req.body);
    const { valid, errors } = await validateUser({ email, username });

    if (!valid) {
      jsonRespone = {
        message: "Invalid fields",
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
      message: "registred",
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
  const jsonReponse: IJSonResponse<IUser> = {
    message: "user profile",
    status: "success",
    statusCode: httpStatus.OK,
    data: user as IUser,
  };

  return res.status(jsonReponse.statusCode).json(jsonReponse);
};

export const sendVerificationEmailController = async (
  req: Request<any, any, TypeOf<typeof sendVerificationEmailSchema>>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = sendVerificationEmailSchema.parse(req.body);
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(httpStatus.BAD_REQUEST).json(
        errorResponse({
          message: "invalid user",
          errors: {
            email: "Invalid email",
          },
          statusCode: httpStatus.BAD_REQUEST,
        })
      );
    }
    if (user?.verified) {
      return res.status(httpStatus.BAD_REQUEST).json(
        errorResponse({
          message: "this user is allready verified",
          statusCode: httpStatus.BAD_REQUEST,
        })
      );
    }

    const token = await generateAVerificatinoTokenService({ userId: user.id });
    const verificationLink = generateAVerificationLink({
      host: req.hostname,
      protocol: req.protocol,
      token,
    });
    console.log("link ", verificationLink);
    const verificationEmail = generateVerificationEmailService({
      user,
      verificationLink,
    });
    console.log("---email---");
    console.log(verificationEmail);
    return res.json(token);
  } catch (err) {
    next(err);
  }
};
