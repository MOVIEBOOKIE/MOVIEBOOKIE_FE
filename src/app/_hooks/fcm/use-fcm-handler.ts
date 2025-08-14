import { useCallback, useEffect } from "react";
import { useFCM } from "./use-fcm";
import { devLog } from "@/utils/dev-logger";
import {
  getNotificationPermission,
  requestPermissionIfDefault,
} from "@/utils/fcm-noti";
type PermissionOutcome = "granted" | "denied" | "default" | "unsupported";

export const useFCMHandler = () => {
  const { requestPermissionAndToken, onForegroundMessage } = useFCM();

  // 1) 진입 시 granted면 바로 토큰 등록 (자동)
  useEffect(() => {
    devLog("🌐 FCM 토큰 등록 시도 (granted인 경우)");
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

  // 2) 'default'일 때만 모달을 띄우는 버튼 핸들러
  const requestPermissionViaButton =
    useCallback(async (): Promise<PermissionOutcome> => {
      const state = getNotificationPermission();
      if (state === "granted") {
        await requestPermissionAndToken();
        return "granted";
      }
      if (state === "default") {
        const ok = await requestPermissionIfDefault();
        if (ok) {
          await requestPermissionAndToken();
          return "granted";
        }
        // 사용자가 모달에서 거절/닫음 → 다시 읽어서 돌려줌
        return getNotificationPermission();
      }
      return state; // denied | unsupported
    }, [requestPermissionAndToken]);

  // 3) 첫 방문 등에서 'default'이고 아직 한 번도 안 물어봤으면 자동으로 물어볼 때(선택)
  const requestOnceIfNeeded = useCallback(async () => {
    const hasAsked = localStorage.getItem("fcm-asked") === "true";
    const shouldAsk = Notification.permission === "default" && !hasAsked;

    if (!shouldAsk) return;

    const ok = await requestPermissionIfDefault();
    localStorage.setItem("fcm-asked", "true");
    if (ok) await requestPermissionAndToken();
  }, [requestPermissionAndToken]);

  return {
    requestPermissionViaButton,
    requestOnceIfNeeded,
  };
};
