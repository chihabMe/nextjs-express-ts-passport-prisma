import { ButtonHTMLAttributes, ComponentPropsWithRef, ReactNode } from "react";
interface Props extends ComponentPropsWithRef<"button"> {
  className?: string;
}
const Button = ({ className, disabled, children, ...props }: Props) => {
  console.log(disabled);
  return (
    <button
      className={`   ${className} ${
        disabled && "opacity-70"
      } px-3 transition-all duration-100 font-medium py-2 text-sm rounded-md  bg-primary text-white cursor-pointer`}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;
