"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { pageView } from "@/lib/gtm";

export default function RouteTracker() {
  const pathname = usePathname();
  const search = useSearchParams();
  const lastHrefRef = useRef<string | null>(null); // ✅ 중복 방지용

  useEffect(() => {
    if (!pathname) return;

    const qs = search?.toString();
    const href =
      typeof window !== "undefined"
        ? `${location.origin}${pathname}${qs ? `?${qs}` : ""}${location.hash || ""}`
        : pathname;

    // ✅ 같은 URL이면 다시 안 보냄(StrictMode/리렌더 방지)
    if (href === lastHrefRef.current) return;
    lastHrefRef.current = href;

    pageView(href, {
      page_title: typeof document !== "undefined" ? document.title : undefined,
      page_referrer:
        typeof document !== "undefined" && document.referrer
          ? document.referrer
          : undefined,
    });

    // (선택) 개발 중 디버그 로그
    if (process.env.NODE_ENV !== "production" && (window as any).__GA_DEBUG__) {
      console.debug("[page_view]", {
        href,
        title: document.title,
        ref: document.referrer,
      });
    }
  }, [pathname, search]);

  return null;
}
