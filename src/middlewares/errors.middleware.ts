import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json(httpStatus["500_MESSAGE"]);
};
