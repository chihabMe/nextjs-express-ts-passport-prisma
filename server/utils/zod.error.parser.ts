import { ZodError } from "zod";
import IJSonResponse from "../interfaces/IJsonResponse";

const zodErrorParser = (err: ZodError) => {
  const errors = err.formErrors.fieldErrors;
  return errors;
};
export default zodErrorParser;
