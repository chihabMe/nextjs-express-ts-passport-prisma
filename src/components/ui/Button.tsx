import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, ComponentPropsWithRef, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/helpers/utils";
const buttonVariants = cva(
  " active:ring-1 focus:ring-1 active:ring-primary inline-flex items-center justify-center text-sm  transition-all duration-100     rounded-md    cursor-pointer disabled:cursor-pointer-none disabled:opacity-90",
  {
    variants: {
      variant: {
        default: "bg-primary text-white",
        ghost: "bg-transparent dark:!text-title-dark text-title",
      },
      size: {
        default: "h-10 px-3 py-2",
        xs: "h-7 px-1.5 py-1.5",
        sm: "h-9 px-1.5 py-1.5",
        md: "h-12 px-6 py-4 text-[15px]",
        lg: "h-14 px-8 py-6   ",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}
const Button = ({
  className,
  loading,
  variant,
  size,
  disabled,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ className, size, variant }))}
      disabled={disabled}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
      {children}
    </button>
  );
};
export default Button;
