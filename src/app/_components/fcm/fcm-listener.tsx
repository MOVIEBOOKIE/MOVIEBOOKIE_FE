// app/_components/fcm-listener.tsx
"use client";

import { useEffect } from "react";
import { onMessage } from "firebase/messaging";
import { messaging } from "../../../../firebase-config";
export default function FcmListener() {
  useEffect(() => {
    if (!messaging) return;

    const unsubscribe = onMessage(messaging, async (payload) => {
      console.log("📩 포그라운드 알림 수신:", payload);

      // 시스템 알림처럼 표시 (브라우저 알림 API로 직접 호출)
      const registration = await navigator.serviceWorker.ready;
      registration.showNotification(payload.notification?.title || "알림", {
        body: payload.notification?.body || "",
        icon: "/icon.png", // ✅ 여기에 아이콘 경로 커스텀 가능
        data: {
          url: "https://movie-bookie.shop", // ✅ 클릭 시 열 페이지
        },
      });
    });

    return () => unsubscribe();
  }, []);

  return null;
}
