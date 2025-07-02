"use client";

import { ReactNode, useState } from "react";
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
  onBackClick?: () => void;
  isHeader?: boolean;
  state?: "default" | "detail" | "full" | "preview";
  showBottomButton?: boolean;
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
  onBackClick,
  isHeader = true,
  state = "default",
  showBottomButton = true,
}: FixedLayoutProps) {
  const [hasClicked, setHasClicked] = useState(false);
  const paddingStyle =
    state === "default"
      ? " pt-21.75 px-5"
      : state === "detail"
        ? "pt-15.5 px-5"
        : state === "preview"
          ? "pt-15.5 px-0"
          : "p-0";

  const handleClick = () => {
    if (hasClicked || isButtonDisabled) return;
    setHasClicked(true);
    onButtonClick?.();
  };

  return (
    <>
      {isHeader && (
        <Header
          title={title}
          showCloseButton={showCloseButton}
          showBackButton={showBackButton}
          onClose={onClose}
          onBack={onBackClick}
        />
      )}
      <div
        className={`${paddingStyle} flex min-h-[calc(100vh-102px)] flex-col text-white`}
      >
        <div className="flex-1 pb-30">{children}</div>
      </div>
      {showBottomButton && (
        <div className="bg-gray-black fixed bottom-0 z-50 w-full max-w-125 px-5 pt-5 pb-12.5">
          <Button
            disabled={isButtonDisabled || hasClicked}
            onClick={handleClick}
            className={cn(
              isButtonDisabled || hasClicked
                ? "bg-gray-900 text-gray-700"
                : "bg-red-main text-white",
            )}
          >
            {buttonText}
          </Button>
        </div>
      )}
    </>
  );
}
