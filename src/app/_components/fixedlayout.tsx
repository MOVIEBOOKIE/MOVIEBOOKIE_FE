"use client";

import { ReactNode } from "react";
import Header from "@/components/header";
import { Button } from "@/components";
import { cn } from "@/utils/cn";

type FixedLayoutProps = {
  title?: string;
  children: ReactNode;
  isButtonDisabled?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
  showCloseButton?: boolean;
  showBackButton?: boolean;
  onClose?: () => void;
};

export default function FixedLayout({
  title,
  children,
  isButtonDisabled = false,
  buttonText = "다음",
  onButtonClick,
  showCloseButton = false,
  showBackButton = true,
  onClose,
}: FixedLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col px-5 pt-21.75 text-white">
      <Header
        title={title}
        showCloseButton={showCloseButton}
        showBackButton={showBackButton}
        onClose={onClose}
      />

      <div className="flex-1 pb-30">{children}</div>

      <div className="pt-auto bg-gray-black fixed bottom-0 left-0 z-50 w-full px-5 pt-2 pb-19">
        <Button
          disabled={isButtonDisabled}
          onClick={onButtonClick}
          className={cn(
            isButtonDisabled
              ? "bg-gray-900 text-gray-700"
              : "bg-red-main text-white",
          )}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
