import { useField } from "formik";
import { ChangeEvent } from "react";

interface Props {
  name: string;
  placeholder: string;
}
const Input = ({ name, placeholder }: Props) => {
  const [field, meta, helpers] = useField({ name });
  const inValid = meta.touched && meta.error != undefined;
  const valid = meta.touched && meta.error == undefined;
  return (
    <div className="w-full flex flex-col gap-2">
      <input
        className={`w-full h-11  rounded-md text-sm px-2 capitalize font-medium outline outline-1
    ${inValid && "outline-red-300 outline-2"}
    ${valid && "outline-green-300 outline-2"}
  ${!inValid && !valid && "outline-blue-300"}
         focus:outline-2 focus:outline-blue-300 `}
        placeholder={placeholder}
        {...field}
      />
      {inValid && (
        <span className="text-sm text-red-400 font-medium">{meta.error}</span>
      )}
    </div>
  );
};
export default Input;
