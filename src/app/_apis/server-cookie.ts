import "server-only";

import { cookies } from "next/headers";

const DEFAULT_FORWARDED_COOKIE_NAMES = ["accessToken"] as const;

type ForwardedCookieHeaderOptions = {
  cookieNames?: readonly string[];
  forwardAll?: boolean;
};

export const getForwardedCookieHeader = async (
  options?: ForwardedCookieHeaderOptions,
) => {
  const cookieStore = await cookies();
  const cookieNames = options?.cookieNames ?? DEFAULT_FORWARDED_COOKIE_NAMES;

  if (options?.forwardAll) {
    return cookieStore.toString();
  }

  return cookieNames
    .map((name) => {
      const value = cookieStore.get(name)?.value;

      return value ? `${name}=${value}` : null;
    })
    .filter((value): value is string => Boolean(value))
    .join("; ");
};

export const getRequestCookieNames = async () => {
  const cookieStore = await cookies();
  return cookieStore.getAll().map((cookie) => cookie.name);
};
