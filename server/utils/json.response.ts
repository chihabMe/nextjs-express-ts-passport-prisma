import httpStatus from "http-status";
import IJSonResponse from "../interfaces/IJsonResponse";
interface SuccessProps<T> extends Pick<IJSonResponse<T>, "message" | "data"> {
  statusCode?: number;
}

export const successResponse = <T>({
  message,
  data,
  statusCode,
}: SuccessProps<T>) => {
  const response: IJSonResponse<T> = {
    message,
    data,
    status: "success",
    statusCode: statusCode ?? httpStatus.OK,
  };
  return response;
};

interface ErrorResponse<T>
  extends Pick<IJSonResponse<T>, "message" | "errors"> {
  statusCode?: number;
}

export const errorResponse = <T>({
  message,
  errors,
  statusCode,
}: ErrorResponse<T>) => {
  const response: IJSonResponse<T> = {
    message,
    errors,
    status: "error",
    statusCode: statusCode ?? httpStatus.BAD_REQUEST,
  };
  return response;
};
