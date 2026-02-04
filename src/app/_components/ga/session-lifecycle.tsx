"use client";

import { useEffect, useRef } from "react";
import { ev } from "@/lib/gtm";

export default function SessionLifecycle() {
  const start = useRef(0);
  const flushed = useRef(false);
  const STARTED_KEY = "__mb_session_started";

  useEffect(() => {
    // 탭 최초 1회 session_start (storage 예외 안전)
    try {
      const started = sessionStorage.getItem(STARTED_KEY);
      if (started !== "1") {
        ev.sessionStart();
        sessionStorage.setItem(STARTED_KEY, "1");
      }
    } catch {
      // storage 불가 환경에서도 최소 1회는 전송
      ev.sessionStart();
    }

    // 시작 시각(정밀)
    start.current = performance.now();

    const flush = () => {
      if (flushed.current) return;
      flushed.current = true;

      const ms = performance.now() - start.current;
      const sec = Math.max(1, Math.ceil(ms / 1000)); // 최소 1초 보장
      ev.sessionDuration(sec);
      ev.sessionEnd();
    };

    const onVis = () => {
      if (document.visibilityState === "hidden") flush();
    };
    const onUnload = () => flush();

    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("beforeunload", onUnload);

    // cleanup: 리스너만 제거 (flush 호출 X)
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("beforeunload", onUnload);
    };
  }, []);

  return null;
}
