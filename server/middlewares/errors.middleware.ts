import { ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import zodErrorParser from "../utils/zod.error.parser";
import { errorResponse } from "../utils/json.response";

export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  if (err instanceof ZodError) {
    const errors = zodErrorParser(err);
    const response = errorResponse({
      message: "Invalid fields",
      errors,
    });
    res.status(response.statusCode).json(response);
  }

  res.status(httpStatus.INTERNAL_SERVER_ERROR).json(httpStatus["500_MESSAGE"]);
};
