import { useField } from "formik";
import {
  ChangeEvent,
  ComponentPropsWithRef,
  HTMLInputTypeAttribute,
} from "react";

interface Props extends ComponentPropsWithRef<"input"> {
  name: string;
}
const Input = ({ name, ...props }: Props) => {
  const [field, meta, helpers] = useField({ name });
  const inValid = meta.touched && meta.error != undefined;
  const valid = meta.touched && meta.error == undefined;
  return (
    <div className="w-full flex flex-col gap-2">
      <input
        {...props}
        className={`w-full h-10  rounded-md text-sm px-3  font-medium outline outline-1
    ${inValid && "outline-red-300 outline-2"}
    ${valid && "outline-green-300 outline-2"}
  ${!inValid && !valid && "outline-blue-300"}
         focus:outline-2 focus:outline-blue-300 `}
        {...field}
      />
      {inValid && (
        <span className="text-sm text-red-400 font-medium">- {meta.error}</span>
      )}
    </div>
  );
};
export default Input;
