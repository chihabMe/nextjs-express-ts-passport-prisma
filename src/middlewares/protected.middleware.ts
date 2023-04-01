import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

const protectedMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session.isAuthenticated && !req.session.user)
    return res.status(httpStatus.UNAUTHORIZED).json(httpStatus["401_MESSAGE"]);
  next();
};

export default protectedMiddleware;
