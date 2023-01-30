import { NextFunction, Response, Request } from "express";
import httpStatus from "http-status";

const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(httpStatus.NOT_FOUND).json(httpStatus["404_MESSAGE"]);
};
export default notFoundMiddleware;
