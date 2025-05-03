import React from "react";
import BackIcon from "@/icons/common/back.svg";
import CloseIcon from "@/icons/common/close.svg";

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
  showCloseButton = true,
  onClose,
}: HeaderProps) {
  return (
    <header className="relative flex h-12 items-center justify-center">
      {showBackButton && (
        <button
          className="absolute top-2.5 left-0"
          onClick={onBack}
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
          onClick={onClose}
          aria-label="닫기"
        >
          <CloseIcon className="h-full w-full" />
        </button>
      )}
    </header>
  );
}
