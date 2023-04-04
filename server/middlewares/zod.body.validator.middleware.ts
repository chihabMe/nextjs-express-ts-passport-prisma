import { HttpStatusCode } from "axios";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { AnyZodObject, ZodEffects, ZodSchema } from "zod";
import IJSonResponse from "../interfaces/IJsonResponse";

const zodValidatorMiddleware =
  (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    let jsonResponse: IJSonResponse;
    const isValid = await schema.safeParseAsync(req.body);
    if (!isValid.success) {
      jsonResponse = {
        message: "please make sure that you didn't miss any required field",
        status: "error",
        statusCode: httpStatus.BAD_REQUEST,
        errors: isValid.error.formErrors.fieldErrors,
      };
      return res.status(jsonResponse.statusCode).json(jsonResponse);
    }
    next();
  };

export default zodValidatorMiddleware;
