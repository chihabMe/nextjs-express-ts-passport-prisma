interface IJSonResponse<T> {
  status: "success" | "error";
  statusCode: number;
  message: string;
  data?: T;
  errors?: any;
}
export default IJSonResponse;
