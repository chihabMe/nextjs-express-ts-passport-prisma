import { ButtonHTMLAttributes, ComponentPropsWithRef, ReactNode } from "react";
interface Props extends ComponentPropsWithRef<"button"> {
  className?: string;
}
const Button = ({ className, disabled, children, ...props }: Props) => {
  console.log(disabled);
  return (
    <button
      className={` ${
        disabled && "opacity-70"
      } px-3 font-medium py-2 text-sm rounded-md  bg-blue-400 text-white cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;
