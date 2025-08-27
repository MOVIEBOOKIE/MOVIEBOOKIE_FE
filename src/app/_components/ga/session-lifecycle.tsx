"use client";

import { useEffect, useRef } from "react";
import { ev } from "@/lib/gtm";

export default function SessionLifecycle() {
  const startedRef = useRef(false);
  const startTs = useRef(Date.now());
  const flushedRef = useRef(false);

  useEffect(() => {
    if (!startedRef.current) {
      ev.sessionStart(); // 탭 최초 1회
      startedRef.current = true;
    }

    const flush = () => {
      if (flushedRef.current) return;
      flushedRef.current = true;
      const sec = Math.max(
        1,
        Math.round((Date.now() - startTs.current) / 1000),
      );
      ev.sessionDuration(sec);
      ev.sessionEnd();
    };

    const onHidden = () => flush();

    const handleVis = () => {
      if (document.visibilityState === "hidden") onHidden();
    };

    document.addEventListener("visibilitychange", handleVis);
    window.addEventListener("beforeunload", flush);

    return () => {
      flush();
      document.removeEventListener("visibilitychange", handleVis);
      window.removeEventListener("beforeunload", flush);
    };
  }, []);

  return null;
}
