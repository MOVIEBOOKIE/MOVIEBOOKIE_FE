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
  isHeader?: boolean;
  state?: "default" | "detail" | "full";
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
  isHeader = true,
  state = "default",
}: FixedLayoutProps) {
  const paddingStyle =
    state === "default"
      ? " pt-21.75 px-5"
      : state === "detail"
        ? "pt-15.5 px-5"
        : "p-0";
  return (
    <>
      {isHeader && (
        <Header
          title={title}
          showCloseButton={showCloseButton}
          showBackButton={showBackButton}
          onClose={onClose}
        />
      )}
      <div className={`${paddingStyle} flex min-h-screen flex-col text-white`}>
        <div className="flex-1 pb-30">{children}</div>
      </div>
      <div className="bg-gray-black fixed bottom-0 z-50 w-full max-w-125 px-5 pt-2 pb-19">
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
    </>
  );
}
