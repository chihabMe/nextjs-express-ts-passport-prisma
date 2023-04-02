import { ChangeEvent } from "react";

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: strig;
  type: string;
  placeholder: string;
}
const Input = ({ onChange, name, placeholder, type }: Props) => {
  return (
    <div className="w-full">
      <input
        className="w-full h-11  rounded-md text-sm px-2 capitalize font-medium outline outline-1 outline-blue-200 focus:outline-2 focus:outline-blue-300 "
        onChange={onChange}
        name={name}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};
export default Input;
