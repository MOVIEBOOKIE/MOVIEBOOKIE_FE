"use client";

import { FixedLayout } from ".";
import { ErrorIcon } from "../../icons";

type ErrorFallbackViewProps = {
  onRetry: () => void;
  buttonText?: string;
  title?: string;
  description?: string;
};

export default function ErrorFallbackView({
  onRetry,
  buttonText = "다시 시도하기",
  title = "현재 접속이 원활하지 않아요",
  description = "잠시 후 다시 시도해 주세요",
}: ErrorFallbackViewProps) {
  return (
    <FixedLayout
      showBackButton={false}
      buttonText={buttonText}
      onButtonClick={onRetry}
    >
      <div className="flex min-h-[calc(100vh-230px)] flex-col items-center justify-center gap-6.5 text-center">
        <ErrorIcon />
        <div className="flex flex-col gap-1.25">
          <p className="body-1-semibold text-gray-400">{title}</p>
          <p className="body-3-medium text-gray-600">{description}</p>
        </div>
      </div>
    </FixedLayout>
  );
}
