"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { BackIcon, CloseIcon } from "@/icons/index";
import { cn } from "@/utils/cn";

/**
 * 공통 Header 컴포넌트 - Fixed 버전
 * @example
 * <Header title="인증번호 입력" />
 * <Header title="회원가입" showCloseButton />
 */

type HeaderProps = {
  title?: string;
  onBack?: () => void;
  showCloseButton?: boolean;
  onClose?: () => void;
  className?: string;
};

export default function Header({
  title,
  onBack,
  showCloseButton = false,
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
        "bg-gray-black fixed top-0 left-0 z-50 flex h-[94px] w-full items-center justify-center",
        className,
      )}
    >
      <button
        className="absolute top-2.5 left-2.5 pt-10"
        onClick={handleBack}
        aria-label="뒤로가기"
        type="button"
      >
        <BackIcon className="h-full w-full" />
      </button>

      {title && <h1 className="body-2-semibold pt-12 text-white">{title}</h1>}

      {showCloseButton && (
        <button
          className="absolute top-2.5 right-2.5 pt-10"
          onClick={handleClose}
          aria-label="닫기"
        >
          <CloseIcon className="h-full w-full" />
        </button>
      )}
    </header>
  );
}
