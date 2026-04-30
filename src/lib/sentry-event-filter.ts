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

const UUID_PATTERN =
  /\b[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\b/gi;
const NUMBER_SEGMENT_PATTERN = /\/\d+(?=\/|$)/g;

function normalizePathname(pathname: string): string {
  return pathname
    .replace(UUID_PATTERN, "{id}")
    .replace(NUMBER_SEGMENT_PATTERN, "/{id}");
}

export function toNormalizedEndpoint(urlValue: string | undefined): string {
  if (!urlValue) {
    return "unknown";
  }

  try {
    const parsed = urlValue.startsWith("http")
      ? new URL(urlValue)
      : new URL(urlValue, "http://localhost");
    return normalizePathname(parsed.pathname || "/");
  } catch {
    const withoutQuery = urlValue.split("?")[0] || "/";
    return normalizePathname(withoutQuery);
  }
}

function sanitizeRequestUrl(urlValue: string | undefined): string | undefined {
  if (!urlValue) {
    return undefined;
  }

  try {
    const parsed = urlValue.startsWith("http")
      ? new URL(urlValue)
      : new URL(urlValue, "http://localhost");
    return normalizePathname(parsed.pathname || "/");
  } catch {
    return normalizePathname(urlValue.split("?")[0] || "/");
  }
}

function readHttpStatusFromEvent(event: ErrorEvent): number | undefined {
  const responseStatus = toNumber(event.contexts?.response?.status_code);
  if (responseStatus) {
    return responseStatus;
  }

  const statusTag =
    toNumber(event.tags?.["http.status_code"]) ??
    toNumber(event.tags?.status_code);
  if (statusTag) {
    return statusTag;
  }

  return undefined;
}

function readHttpStatusFromHint(hint: EventHint): number | undefined {
  const original = hint.originalException as
    | {
        response?: { status?: unknown };
        status?: unknown;
        config?: { method?: string; url?: string };
      }
    | undefined;

  const axiosLikeStatus = toNumber(original?.response?.status);
  if (axiosLikeStatus) {
    return axiosLikeStatus;
  }

  return toNumber(original?.status);
}

function readMethodAndEndpointFromHint(hint: EventHint): {
  method?: string;
  endpoint?: string;
} {
  const original = hint.originalException as
    | { config?: { method?: string; url?: string } }
    | undefined;

  const method = original?.config?.method?.toUpperCase();
  const endpoint = toNormalizedEndpoint(original?.config?.url);

  return { method, endpoint };
}

export function keepOnly5xxEvent(
  event: ErrorEvent,
  hint: EventHint,
): ErrorEvent | null {
  const status = readHttpStatusFromEvent(event) ?? readHttpStatusFromHint(hint);

  if (event.user?.email) {
    delete event.user.email;
  }

  if (event.request?.url) {
    event.request.url = sanitizeRequestUrl(event.request.url);
  }

  if (event.request?.headers) {
    const headers = event.request.headers as Record<string, unknown>;
    for (const key of Object.keys(headers)) {
      const normalized = key.toLowerCase();
      if (normalized === "authorization" || normalized === "cookie") {
        delete headers[key];
      }
    }
  }

  const { method, endpoint } = readMethodAndEndpointFromHint(hint);
  if (status) {
    event.tags = {
      ...event.tags,
      error_type: "api_error",
      status_code: String(status),
      ...(method ? { method } : {}),
      ...(endpoint ? { endpoint } : {}),
    };
  }

  if (status && method && endpoint) {
    event.fingerprint = ["axios", String(status), method, endpoint];
  }

  if (status && (status < 500 || status >= 600)) {
    return null;
  }

  return event;
}
