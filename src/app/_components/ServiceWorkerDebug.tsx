"use client";
import { useEffect } from "react";

export default function ServiceWorkerDebug() {
  useEffect(() => {
    console.log("💡 ServiceWorkerDebug mounted");

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => console.log("✅ 수동 등록 성공:", reg.scope))
        .catch((err) => console.error("❌ 등록 실패:", err));
    } else {
      console.warn("🚫 serviceWorker 지원 안 함");
    }
  }, []);

  return null;
}
