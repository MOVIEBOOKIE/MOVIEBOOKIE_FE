import { useCallback, useEffect } from "react";
import { useFCM } from "./use-fcm";
import { devLog } from "@/utils/dev-logger";

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
    devLog("🌐 모든 환경에서 FCM 토큰 등록 시도");
    if (
      typeof window !== "undefined" &&
      Notification.permission === "granted"
    ) {
      requestPermissionAndToken();
    }

    onForegroundMessage((payload) => {
      devLog("📥 Foreground 알림 수신:", payload);
    });
  }, [requestPermissionAndToken, onForegroundMessage]);

  return { requestOnceIfNeeded };
};
