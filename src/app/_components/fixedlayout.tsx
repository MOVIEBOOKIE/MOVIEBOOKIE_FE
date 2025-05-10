"use client";

import { ReactNode } from "react";
import Header from "@/components/header";
import { Button } from "@/components";
import { cn } from "@/utils/cn";

type FixedLayoutProps = {
  title: string;
  children: ReactNode;
  isButtonDisabled?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
};

export default function FixedLayout({
  title,
  children,
  isButtonDisabled = false,
  buttonText = "다음",
  onButtonClick,
}: FixedLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col px-5 pt-30 text-white">
      <Header title={title} />

      <div className="flex-1">{children}</div>

      <div className="mt-auto mb-19">
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
