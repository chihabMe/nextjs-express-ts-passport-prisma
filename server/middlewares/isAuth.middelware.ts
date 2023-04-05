import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import IJSonResponse from "../interfaces/IJsonResponse";

const isAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    const jsonResponse: IJSonResponse<null> = {
      status: "error",
      statusCode: httpStatus.UNAUTHORIZED,
      message: "you need to be authorized to access this route",
    };
    return res.status(httpStatus.UNAUTHORIZED).json(jsonResponse);
  }
  next();
};

export default isAuthMiddleware;
