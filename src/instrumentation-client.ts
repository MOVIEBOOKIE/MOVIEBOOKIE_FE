import * as Sentry from "@sentry/nextjs";
import { clientSentryOptions } from "@/lib/sentry-options";

Sentry.init({
  ...clientSentryOptions,
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
      beforeAddRecordingEvent: (event) => event,
    }),
  ],
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
