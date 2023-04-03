import { useField } from "formik";
import { ChangeEvent } from "react";

interface Props {
  name: string;
  placeholder: string;
}
const Input = ({ name, placeholder }: Props) => {
  const [field, meta, helpers] = useField({ name });
  return (
    <div className="w-full flex flex-col gap-2">
      <input
        className="w-full h-11  rounded-md text-sm px-2 capitalize font-medium outline outline-1 outline-blue-200 focus:outline-2 focus:outline-blue-300 "
        placeholder={placeholder}
        {...field}
      />
      {meta.touched && meta.error && (
        <span className="text-sm text-red-400 font-medium">{meta.error}</span>
      )}
    </div>
  );
};
export default Input;
