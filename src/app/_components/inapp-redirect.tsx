"use client";

import { useEffect } from "react";

export default function InAppRedirect() {
  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const currentUrl = window.location.href;
    const isInApp =
      /kakaotalk|naver|line|instagram|daum|everytime|samsungbrowser\/[^1]/i.test(
        ua,
      );

    if (!isInApp) return;

    if (ua.includes("kakaotalk")) {
      window.location.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(
        currentUrl,
      )}`;
      return;
    }
  }, []);

  return null;
}
