"use client";

import { CSSProperties, ReactNode } from "react";
import Header from "@/components/header";
import { Button } from "@/components";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";

type FixedLayoutProps = {
  title?: string;
  children: ReactNode;
  isButtonDisabled?: boolean;
  isLoading?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
  showCloseButton?: boolean;
  showBackButton?: boolean;
  onClose?: () => void;
  onBackClick?: () => void;
  isHeader?: boolean;
  state?: "default" | "detail" | "full" | "preview";
  showBottomButton?: boolean;
  step?: number;
  className?: string;
  style?: CSSProperties;
  closeRedirectPath?: string;
};

export default function FixedLayout({
  title,
  children,
  isButtonDisabled = false,
  isLoading = false,
  buttonText = "다음",
  onButtonClick,
  showCloseButton = false,
  showBackButton = true,
  onClose,
  onBackClick,
  isHeader = true,
  state = "default",
  showBottomButton = true,
  className,
  style,
  closeRedirectPath,
}: FixedLayoutProps) {
  const router = useRouter();

  const paddingStyle =
    state === "default"
      ? "pt-21.75 px-5"
      : state === "detail"
        ? "pt-15.5 px-5"
        : state === "preview"
          ? "pt-15.5 px-0"
          : "p-0";

  const handleClick = () => {
    if (isButtonDisabled || isLoading) return;
    onButtonClick?.();
  };
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else if (closeRedirectPath) {
      router.push(closeRedirectPath);
    }
  };
  return (
    <>
      {isHeader && (
        <Header
          title={title}
          showCloseButton={showCloseButton}
          showBackButton={showBackButton}
          onClose={handleClose}
          onBack={onBackClick}
        />
      )}
      <div
        className={cn(
          `${paddingStyle} flex min-h-[calc(100vh-102px)] flex-col text-white`,
          className,
        )}
        style={style}
      >
        <div className="flex-1 pb-30">{children}</div>
      </div>

      {showBottomButton && (
        <div className="bg-gray-black fixed bottom-0 z-50 w-full max-w-125 px-5 pt-5 pb-12.5">
          <Button
            disabled={isButtonDisabled}
            onClick={handleClick}
            isLoading={isLoading}
            className={cn(
              isButtonDisabled
                ? "bg-gray-900 text-gray-700"
                : "bg-red-main text-white",
            )}
          >
            {isLoading ? (
              <div className="mx-auto h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              buttonText
            )}
          </Button>
        </div>
      )}
    </>
  );
}
