"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { BackIcon, CloseIcon } from "@/icons/index";
import { cn } from "@/utils/cn";

type HeaderProps = {
  title?: string;
  onBack?: () => void;
  showCloseButton?: boolean;
  showBackButton?: boolean;
  onClose?: () => void;
  className?: string;
};

export default function Header({
  title,
  onBack,
  showCloseButton = false,
  showBackButton = true,
  onClose,
  className,
}: HeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) return onBack();
    router.back();
  };

  const handleClose = () => {
    if (onClose) return onClose();
    router.push("/");
  };

  return (
    <header
      className={cn(
        "bg-gray-black fixed top-0 z-50 mt-4 flex h-[50px] w-full max-w-125 items-center justify-center focus-within:border-white",
        className,
      )}
    >
      {showBackButton && (
        <button
          className="absolute top-2.5 left-2.5"
          onClick={handleBack}
          aria-label="뒤로가기"
          type="button"
        >
          <BackIcon className="h-full w-full" />
        </button>
      )}
      {title && <h1 className="body-2-semibold pt-3 text-white">{title}</h1>}

      {showCloseButton && (
        <button
          type="button"
          className="absolute top-2.5 right-2.5"
          onClick={handleClose}
          aria-label="닫기"
        >
          <CloseIcon className="h-full w-full" />
        </button>
      )}
    </header>
  );
}
