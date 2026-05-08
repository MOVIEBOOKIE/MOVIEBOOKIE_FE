"use client";

import * as Sentry from "@sentry/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { devLog } from "./_utils/dev-logger";
import ErrorFallbackView from "./_components/error-fallback-view";

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

  return <ErrorFallbackView onRetry={handleButtonClick} />;
}
