"use client";
import { devError, devLog } from "@/utils/dev-logger";
import { useEffect } from "react";

export default function ServiceWorkerDebug() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => devLog("✅ 수동 등록 성공:", reg.scope))
        .catch((err) => devError("❌ 등록 실패:", err));
    } else {
      console.warn("🚫 serviceWorker 지원 안 함");
    }
  }, []);

  return null;
}
