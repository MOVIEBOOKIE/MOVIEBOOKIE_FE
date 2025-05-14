import { ButtonHTMLAttributes } from "react";
import { cn } from "../_utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  className,
  variant = "primary",
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled;

  const buttonStyles = cn(
    "body-3-medium w-full rounded-xl py-4",
    variant === "primary"
      ? "bg-red-main text-gray-white"
      : "bg-gray-950 text-gray-300",
    isDisabled && "bg-gray-900 text-gray-700 cursor-not-allowed",
    className,
  );

  return (
    <button
      type="button"
      className={buttonStyles}
      {...props}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
