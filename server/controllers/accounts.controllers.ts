import { Request, Response, NextFunction } from "express";
import {
  createUserService,
  deleteTokenService,
  findUniqueTokenService,
  findUserByEmail,
  generateAVerificatinoTokenService,
  generateAVerificationLink,
  generateVerificationEmailService,
  updateUserService,
  validateUser,
} from "../services/accounts.services";

import { hashPassword } from "../lib/auth.libs";

import httpStatus from "http-status";

import IJSonResponse from "../interfaces/IJsonResponse";
import IUser from "../interfaces/IUser";
import { TypeOf } from "zod";

import { registerationSchema } from "../schemas/auth.schema";
import { errorResponse, successResponse } from "../utils/json.response";
import { sendVerificationEmailSchema } from "../schemas/accounts.schemas";
import { sendVerificationEmail } from "../lib/email";

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
    // const { password: _, ...userWithOutPasssword } = { ...user };
    // jsonRespone = {
    //   message: "registred",
    //   status: "success",
    //   statusCode: httpStatus.CREATED,
    //   data: userWithOutPasssword as IUser,
    // };
    // return res.status(jsonRespone.statusCode).json(jsonRespone);
    req.params.email = email;
    next();
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
      userId: user.id,
    });
    console.log("link ", verificationLink);
    const { html, subject } = generateVerificationEmailService({
      user,
      verificationLink,
    });
    const a = sendVerificationEmail({
      to: email,
      subject,
      context: {
        verificationLink,
        username: user.username,
      },
    });
    console.log(a);
    return res.json(
      successResponse({
        message: "check your email for the activation link",
        statusCode: httpStatus.OK,
      })
    );
  } catch (err) {
    next(err);
  }
};

export const verifyVerificationLinkController = async (
  req: Request<{ token: string; userId: string }>,
  res: Response
) => {
  const userId = req.params.userId;
  const value = req.params.token;
  if (!userId || !value)
    return res.status(httpStatus.BAD_REQUEST).json(
      errorResponse({
        message: "invalid link",
        statusCode: httpStatus.BAD_REQUEST,
      })
    );
  const token = await findUniqueTokenService({
    userId,
    value,
  });
  if (!token)
    return res.status(httpStatus.BAD_REQUEST).json(
      errorResponse({
        message: "invalid link",
        statusCode: httpStatus.BAD_REQUEST,
      })
    );
  await updateUserService({
    where: {
      id: userId,
    },
    data: {
      verified: true,
      active: true,
    },
  });
  await deleteTokenService({
    userId,
    value,
  });
  return res.status(httpStatus.OK).json(
    successResponse({
      message: "activated",
      statusCode: httpStatus.OK,
    })
  );
};
