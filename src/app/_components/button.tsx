import { ButtonHTMLAttributes } from "react";
import { cn } from "../_utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  isLoading?: boolean;
}

export default function Button({
  children,
  className,
  variant = "primary",
  disabled,
  isLoading = false,
  ...props
}: ButtonProps) {
  const isDisabled = disabled;

  const buttonStyles = cn(
    "body-3-medium w-full rounded-xl py-4",
    variant === "primary"
      ? cn("bg-red-main text-gray-white", !isLoading && "active:bg-red-700")
      : "bg-gray-950 text-gray-300",
    isDisabled &&
      "bg-gray-900 text-gray-700 cursor-not-allowed active:bg-gray-900",
    className,
  );

  return (
    <button
      type="button"
      className={buttonStyles}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
