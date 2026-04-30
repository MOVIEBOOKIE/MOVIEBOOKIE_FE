import type { ErrorEvent, EventHint } from "@sentry/nextjs";

function toNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return undefined;
}

function readHttpStatusFromEvent(event: ErrorEvent): number | undefined {
  const responseStatus = toNumber(event.contexts?.response?.status_code);
  if (responseStatus) {
    return responseStatus;
  }

  const statusTag = toNumber(event.tags?.["http.status_code"]);
  if (statusTag) {
    return statusTag;
  }

  return undefined;
}

function readHttpStatusFromHint(hint: EventHint): number | undefined {
  const original = hint.originalException as
    | { response?: { status?: unknown }; status?: unknown }
    | undefined;

  const axiosLikeStatus = toNumber(original?.response?.status);
  if (axiosLikeStatus) {
    return axiosLikeStatus;
  }

  return toNumber(original?.status);
}

export function keepOnly5xxEvent(
  event: ErrorEvent,
  hint: EventHint,
): ErrorEvent | null {
  const status = readHttpStatusFromEvent(event) ?? readHttpStatusFromHint(hint);

  if (status && (status < 500 || status >= 600)) {
    return null;
  }

  return event;
}
