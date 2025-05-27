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
        icon: "/images/favicon/48x48.png",
        data: {
          url: "https://movie-bookie.shop",
        },
      });
    });

    return () => unsubscribe();
  }, []);

  return null;
}
