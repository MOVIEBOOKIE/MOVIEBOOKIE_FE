"use client";

import { ButtonHTMLAttributes } from "react";
import { cn } from "../_utils/cn";
import { useLoading } from "app/_context/loading-context";

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
  isLoading,
  ...props
}: ButtonProps) {
  const { isLoading: globalLoading } = useLoading();
  const effectiveLoading = isLoading ?? globalLoading;

  const isActuallyDisabled = disabled || effectiveLoading;

  const buttonStyles = cn(
    "body-3-medium w-full rounded-xl py-4 flex items-center justify-center transition-colors",
    variant === "primary" && "text-gray-white bg-red-main",
    variant === "secondary" && "bg-gray-950 text-gray-300",
    !effectiveLoading &&
      !disabled &&
      variant === "primary" &&
      "active:bg-red-700",
    disabled &&
      !effectiveLoading &&
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
      {effectiveLoading ? (
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : (
        children
      )}
    </button>
  );
}
