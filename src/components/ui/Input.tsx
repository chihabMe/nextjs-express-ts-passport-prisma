import { cn } from "@/helpers/utils";
import { cva, VariantProps } from "class-variance-authority";
import { useField } from "formik";
import {
  ChangeEvent,
  ComponentPropsWithRef,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
} from "react";
import Button from "./Button";

interface Props extends ComponentPropsWithRef<"input"> {
  name: string;
}
const inputVariants = cva("w-full rounded-md text-sm   font-medium ", {
  variants: {
    variant: {
      default: " ring-2 h-10 px-2   focus:ring-blue-300  ",
      sm: " ring-2 h-8 px-1   focus:ring-blue-300  ",
      md: " ring-2 h-12 px-4 text-sm    focus:ring-blue-300  ",
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
}
export interface InputWithVariantsProps
  extends ComponentPropsWithRef<"input">,
    VariantProps<typeof inputVariants> {}
const InputWithVarianst = ({
  className,
  status,
  variant,
  ...props
}: InputWithVariantsProps) => {
  return (
    <input
      {...props}
      className={cn(inputVariants({ className, status, variant }))}
    />
  );
};
const Input = ({ name, label, className, variant, ...props }: inputProps) => {
  const [field, meta, helpers] = useField({ name });
  const inValid = meta.touched && meta.error != undefined;
  const valid = meta.touched && meta.error == undefined;
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
      <InputWithVarianst status={status} {...props} {...field} />
      {inValid && (
        <span className="text-sm text-red-400 font-medium">- {meta.error}</span>
      )}
    </div>
  );
};
export default Input;
