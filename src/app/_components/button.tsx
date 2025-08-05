"use client";

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
  const isActuallyDisabled = disabled || isLoading;

  const buttonStyles = cn(
    "body-3-medium w-full rounded-xl py-4 flex items-center justify-center transition-colors",
    variant === "primary" && "text-gray-white bg-red-main",
    variant === "secondary" && "bg-gray-950 text-gray-300",
    !isLoading && !disabled && variant === "primary" && "active:bg-red-700",
    disabled &&
      !isLoading &&
      "bg-gray-900 text-gray-700 cursor-not-allowed active:bg-gray-900",
    className,
  );

  return (
    <button
      type="button"
      className={buttonStyles}
      disabled={isActuallyDisabled}
      {...props}
    >
      {isLoading ? (
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : (
        children
      )}
    </button>
  );
}
