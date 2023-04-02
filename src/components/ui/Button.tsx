import { ReactNode } from "react";
interface Props {
  children: ReactNode | string;
  className?: string;
}
const Button = ({ children, className }: Props) => {
  return (
    <button
      type="submit"
      className={` px-2 font-medium text-sm bg-blue-400 transition-all duration-100 hover:bg-blue-300 text-white py-2.5 rounded-md font-medium ${className}`}
    >
      {children}
    </button>
  );
};
export default Button;
