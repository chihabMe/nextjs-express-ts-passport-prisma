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
      } px-2 py-2 rounded-md capitalize bg-blue-400 text-white cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;
