"use client";

import * as Sentry from "@sentry/nextjs";
import { useRouter } from "next/navigation";
import { FixedLayout } from "./_components";
import { ErrorIcon } from "../icons";
import { useEffect, useRef } from "react";
import { devLog } from "./_utils/dev-logger";

export default function ErrorPage({ error }: { error: Error }) {
  const router = useRouter();
  const consoleCount = useRef(0);

  useEffect(() => {
    Sentry.captureException(error);

    if (consoleCount.current < 5) {
      devLog("🛑 error.tsx 진입");
      devLog("🧨 에러 메시지:", error?.message);
      devLog("🧵 에러 스택:", error?.stack);
      consoleCount.current += 1;
    }
  }, [error]);

  const handleButtonClick = () => {
    router.refresh();
  };

  return (
    <FixedLayout
      showBackButton={false}
      buttonText="다시 시도하기"
      onButtonClick={handleButtonClick}
    >
      <div className="flex min-h-[calc(100vh-230px)] flex-col items-center justify-center gap-6.5 text-center">
        <ErrorIcon />
        <div className="flex flex-col gap-1.25">
          <p className="body-1-semibold text-gray-400">
            현재 접속이 원활하지 않아요
          </p>
          <p className="body-3-medium text-gray-600">
            잠시 후 다시 시도해 주세요
          </p>
        </div>
      </div>
    </FixedLayout>
  );
}
