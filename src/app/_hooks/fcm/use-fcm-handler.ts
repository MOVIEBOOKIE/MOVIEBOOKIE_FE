import { useCallback, useEffect, useState } from "react";
import { useFCM } from "./use-fcm";

export const useFCMHandler = () => {
  const { requestPermissionAndToken, onForegroundMessage } = useFCM();

  // 조건 만족할 때 호출 (ex. 로그인 후 홈 진입 시)
  const requestOnceIfNeeded = useCallback(async () => {
    const hasAsked = localStorage.getItem("fcm-asked") === "true";
    const shouldRequest = Notification.permission === "default" && !hasAsked;

    if (!shouldRequest) return;

    const permission = await Notification.requestPermission();
    localStorage.setItem("fcm-asked", "true");

    if (permission === "granted") {
      await requestPermissionAndToken();
    }
  }, [requestPermissionAndToken]);

  useEffect(() => {
    console.log("🌐 모든 환경에서 FCM 토큰 등록 시도");

    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "granted") {
        requestPermissionAndToken();
      }
    }

    onForegroundMessage((payload) => {
      const title =
        payload.notification?.title ||
        payload.data?.title ||
        "📩 무비부키 알림";
      const body =
        payload.notification?.body ||
        payload.data?.body ||
        "새로운 알림이 도착했어요!";

      if (typeof window !== "undefined" && "Notification" in window) {
        if (Notification.permission === "granted") {
          navigator.serviceWorker.ready.then((registration) => {
            registration.showNotification(title, {
              body,
              icon: "/images/favicon/96x96.png",
              tag: "foreground-noti",
              renotify: true,
            } as NotificationOptions);
          });
        }
      }

      const { eventId } = payload.data || {};
      const parsedEventId = Number(eventId);

      if (!title || !body || !eventId || isNaN(parsedEventId)) return;
    });
  }, [requestPermissionAndToken, onForegroundMessage]);

  return {
    requestOnceIfNeeded,
  };
};
