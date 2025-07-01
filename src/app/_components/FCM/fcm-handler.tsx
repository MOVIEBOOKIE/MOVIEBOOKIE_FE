"use client";

import { useFCM } from "app/_hooks/use-fcm";
import { useEffect } from "react";

export default function FCMHandler() {
  const { requestPermissionAndToken, onForegroundMessage } = useFCM();

  useEffect(() => {
    // ✅ 이미 등록했는지 확인
    const alreadyRegistered = localStorage.getItem("fcm-registered");
    if (alreadyRegistered === "true") {
      console.log("✅ 이미 등록된 FCM → 건너뜀");
      return;
    }

    console.log("📡 최초 FCM 등록 시작");
    requestPermissionAndToken().then(() => {
      localStorage.setItem("fcm-registered", "true");
    });

    onForegroundMessage((payload) => {
      console.log("📩 알림 fcm handler수신:", payload);
    });
  }, []);

  return null;
}
