import toast from "react-hot-toast";
import { CheckIcon } from "lucide-react";

export const toastError = (message: string) => {
  toast.error(message, {
    className: "!text-sm ",
  });
};
export const toastSuccess = (message: string, duration?: number) => {
  toast.success(message, {
    className: "!text-sm  ",
    duration,
  });
};
