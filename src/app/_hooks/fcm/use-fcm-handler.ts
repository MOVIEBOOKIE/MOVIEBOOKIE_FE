import { useEffect, useState } from "react";
import { useFCM } from "./use-fcm";
import { useNotificationStore } from "app/_stores/use-noti";

export const useFCMHandler = () => {
  const [showPermissionBanner, setShowPermissionBanner] = useState(false);
  const { requestPermissionAndToken, onForegroundMessage } = useFCM();

  useEffect(() => {
    console.log("🌐 모든 환경에서 FCM 토큰 등록 시도");
    requestPermissionAndToken();

    // iOS PWA 권한 배너 표시 조건
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    if (isIOS && isStandalone && Notification.permission === "default") {
      console.log("ℹ️ iOS PWA - 알림 권한 배너 표시");
      setShowPermissionBanner(true);
    }

    onForegroundMessage((payload) => {
      console.log("📩 알림 수신 (fcm handler):", payload);

      const title =
        payload.notification?.title ||
        payload.data?.title ||
        "📩 무비부키 알림";
      const body =
        payload.notification?.body ||
        payload.data?.body ||
        "새로운 알림이 도착했어요!";

      // foreground 알림
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

      const { code, eventId } = payload.data || {};
      const parsedCode = code ? Number(code) : 99;
      const parsedEventId = Number(eventId);

      if (!title || !body || !eventId || isNaN(parsedEventId)) return;

      useNotificationStore.getState().addNotification({
        title,
        body,
        code: parsedCode,
        eventId: parsedEventId,
      });

      console.log("✅ 알림 저장 완료:", title);
    });
  }, []);

  return {
    showPermissionBanner,
    setShowPermissionBanner,
    requestPermissionAndToken,
  };
};
