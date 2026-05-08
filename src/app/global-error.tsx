"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import ErrorFallbackView from "./_components/error-fallback-view";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="ko">
      <body>
        <ErrorFallbackView onRetry={reset} />
      </body>
    </html>
  );
}
