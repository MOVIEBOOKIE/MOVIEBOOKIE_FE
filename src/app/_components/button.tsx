import { ButtonHTMLAttributes } from "react";
import { cn } from "../_utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  className?: string;
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  const buttonStyles =
    variant === "primary"
      ? "bg-red-main text-gray-white"
      : "bg-gray-950 text-gray-300";
  return (
    <button
      type="button"
      className={cn(
        "body-3-medium w-full rounded-xl py-4",
        buttonStyles,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
