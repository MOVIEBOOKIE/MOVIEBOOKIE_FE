import { ButtonHTMLAttributes } from "react";
import { cn } from "../_utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  className?: string;
}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "body-3-medium w-full rounded-xl bg-gray-950 py-4 text-gray-300",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
