import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

const isAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated())
    return res.status(httpStatus.UNAUTHORIZED).json(httpStatus["401_MESSAGE"]);
  next();
};

export default isAuthMiddleware;
