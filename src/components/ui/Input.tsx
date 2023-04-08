import { cn } from "@/helpers/utils";
import { cva, VariantProps } from "class-variance-authority";
import { useField } from "formik";
import {
  ChangeEvent,
  ComponentPropsWithRef,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactElement,
  useState,
} from "react";
import Button from "./Button";

interface Props extends ComponentPropsWithRef<"input"> {
  name: string;
}
const inputVariants = cva("", {
  variants: {
    variant: {
      default: "ring-text",
      sm: " ring-2 h-8 px-1     ",
      md: " ring-2 h-12 px-4 text-sm       ",
    },
    status: {
      default: "outline-primary",
      valid: "ring-green-300 ",
      inValid: "ring-red-300 ",
    },
  },
  defaultVariants: {
    variant: "default",
    status: "default",
  },
});
export interface inputProps
  extends ComponentPropsWithRef<"input">,
    VariantProps<typeof inputVariants> {
  name: string;
  label?: string;
  icon?: ReactElement;
  icon2?: ReactElement;
  passwordInput?: boolean;
}
const Input = ({
  name,
  label,
  className,
  icon,
  icon2,
  passwordInput,
  variant,
  type,
  ...props
}: inputProps) => {
  const [field, meta, helpers] = useField({ name });
  const inValid = meta.touched && meta.error != undefined;
  const [showText, setShowText] = useState(false);
  const valid = meta.touched && meta.error == undefined;

  const toggleTextVisibility = () => {
    if (passwordInput) setShowText((prev) => !prev);
  };
  let status: "default" | "valid" | "inValid" = "default";
  if (valid) status = "valid";
  if (inValid) status = "inValid";
  return (
    <div className="w-full flex flex-col gap-2.5 py-1.5">
      {label && (
        <label className="text- text-title font-medium capitalize">
          {label}
        </label>
      )}
      <div
        className={cn(
          className,
          `flex    items-center gap-1   rounded-md    h-11 px-2    `,
          inValid ? "ring-red-300 ring-2 text-red-400" : "",
          valid ? "ring-green-300 ring-2 text-green-600" : ""
        )}
      >
        <input
          type={showText ? "text" : type}
          className={"w-full   h-10 px-2 outline-none  text-sm   font-medium "}
          {...props}
          {...field}
        />
        <div
          className="cursor-pointer active:scale-95"
          onClick={toggleTextVisibility}
        >
          {showText ? icon2 : icon}
        </div>
      </div>

      {inValid && (
        <span className="text-sm text-red-400 font-medium font-bold ">
          {meta.error?.toLowerCase()}
        </span>
      )}
    </div>
  );
};
export default Input;
