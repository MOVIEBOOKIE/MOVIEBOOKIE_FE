import "server-only";

import { cookies } from "next/headers";

const DEFAULT_FORWARDED_COOKIE_NAMES = ["accessToken"] as const;

export const getForwardedCookieHeader = async (
  cookieNames: readonly string[] = DEFAULT_FORWARDED_COOKIE_NAMES,
) => {
  const cookieStore = await cookies();

  return cookieNames
    .map((name) => {
      const value = cookieStore.get(name)?.value;

      return value ? `${name}=${value}` : null;
    })
    .filter((value): value is string => Boolean(value))
    .join("; ");
};
