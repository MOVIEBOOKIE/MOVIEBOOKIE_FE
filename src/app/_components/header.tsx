"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { BackIcon, CloseIcon } from "@/icons/index";

/**
 * 공통 Header 컴포넌트
 * @example
 * // 기본 뒤로가기 버튼 + 제목만
 * <Header title="인증번호 입력" />
 *
 * // 닫기 버튼도 표시 (닫기 누르면 '/'로 이동)
 * <Header title="회원가입" showCloseButton />
 *
 */

type HeaderProps = {
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  showCloseButton?: boolean;
  onClose?: () => void;
};

export default function Header({
  title,
  showBackButton = true,
  onBack,
  showCloseButton = false,
  onClose,
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
    <header className="relative flex h-12 items-center justify-center">
      {showBackButton && (
        <button
          className="absolute top-2.5 left-0"
          onClick={handleBack}
          aria-label="뒤로가기"
        >
          <BackIcon className="h-full w-full" />
        </button>
      )}

      {title && (
        <h1 className="pt-4.25 pb-2.75 text-base font-semibold text-white">
          {title}
        </h1>
      )}

      {showCloseButton && (
        <button
          className="absolute top-2.5 right-0"
          onClick={handleClose}
          aria-label="닫기"
        >
          <CloseIcon className="h-full w-full" />
        </button>
      )}
    </header>
  );
}
