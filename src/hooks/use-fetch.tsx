import { axiosClientInstance } from "@/helpers/axios";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import IJSonResponse from "../../server/interfaces/IJsonResponse";

const useFetch = <T,>() => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<number>(0);
  const [errors, setErros] = useState<any | null>(null);
  const [success, setSucess] = useState(false);
  const [done, setDone] = useState(false);

  const get = async ({ url }: { url: string }) =>
    request({
      method: "GET",
      url,
    });

  const post = async ({ url, data }: { url: string; data: string }) =>
    request({
      method: "POST",
      url,
      data,
    });

  const del = async ({ url }: { url: string }) =>
    request({
      method: "DELETE",
      url,
    });
  const update = async ({ url }: { url: string }) =>
    request({
      method: "PUT",
      url,
    });

  const request = async ({
    url,
    method,
    data,
  }: {
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    data?: any;
  }) => {
    setLoading(true);
    try {
      let response;
      switch (method) {
        case "GET":
          response = await axiosClientInstance.get<IJSonResponse<T>>(url);
          break;
        case "POST":
          response = await axiosClientInstance.post<IJSonResponse<T>>(
            url,
            data,
            {
              headers: {
                "content-type": "application/json",
              },
            }
          );
          break;
        case "PUT":
          response = await axiosClientInstance.put<IJSonResponse<T>>(url);
          break;
        case "DELETE":
          response = await axiosClientInstance.delete<IJSonResponse<T>>(url);
          break;
        default:
          response = await axiosClientInstance.get<IJSonResponse<T>>(url);
      }
      console.log("use fetch", response.data);
      setStatus(response.status);
      setData(response.data?.data ?? null);
      setMessage(response.data.message);
      setSucess(true);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log("errors", err.response?.data.message);
        setStatus(err.response?.data.statusCode);
        setMessage(err.response?.data.message);
        setErros(err.response?.data.errors);
        setSucess(false);
      }
    }
    setDone(true);
    setLoading(false);
  };

  return {
    loading,
    data,
    status,
    errors,
    success,
    done,
    get,
    post,
    del,
    update,
    request,
    message,
  };
};
export default useFetch;
