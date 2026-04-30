import * as Sentry from "@sentry/nextjs";
import { clientSentryOptions } from "@/lib/sentry-options";

Sentry.init({
  ...clientSentryOptions,
  integrations: [Sentry.replayIntegration()],
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
