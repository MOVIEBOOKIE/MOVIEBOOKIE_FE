import { keepOnly5xxEvent } from "@/lib/sentry-event-filter";

const isProd = process.env.NODE_ENV === "production";

export const baseSentryOptions = {
  dsn: process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_APP_ENV ?? process.env.NODE_ENV,
  release: process.env.SENTRY_RELEASE ?? process.env.NEXT_PUBLIC_SENTRY_RELEASE,
  tracesSampleRate: isProd ? 0.1 : 1,
  enableLogs: !isProd,
  sendDefaultPii: false,
  beforeSend: keepOnly5xxEvent,
};

export const clientSentryOptions = {
  ...baseSentryOptions,
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  release: process.env.NEXT_PUBLIC_SENTRY_RELEASE ?? process.env.SENTRY_RELEASE,
  integrations: [],
  replaysSessionSampleRate: isProd ? 0.05 : 0.1,
  replaysOnErrorSampleRate: 1.0,
  ignoreErrors: [
    "ResizeObserver loop limit exceeded",
    "ResizeObserver loop completed with undelivered notifications",
  ],
};
