import { useCallback, useEffect } from "react";
import { useFCM } from "./use-fcm";
import { devLog } from "@/utils/dev-logger";
import {
  getNotificationPermission,
  requestPermissionWithOutcome,
} from "@/utils/fcm-noti";

export type PermissionOutcome =
  | "granted"
  | "denied"
  | "default" // 현재 상태가 default(모달 안 뜸/못 뜸 등)
  | "unsupported"
  | "dismissed";

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

  // 2) 버튼 클릭 시: outcome 기반으로 반환
  const requestPermissionViaButton =
    useCallback(async (): Promise<PermissionOutcome> => {
      const state = getNotificationPermission();

      if (state === "unsupported") return "unsupported";
      if (state === "granted") {
        await requestPermissionAndToken();
        return "granted";
      }

      // state가 default 또는 denied일 때 모달/결과 얻기
      const outcome = await requestPermissionWithOutcome(); // "granted" | "denied" | "default"/"dismissed" | "unsupported"

      if (outcome === "granted") {
        await requestPermissionAndToken();
      }
      return outcome as PermissionOutcome;
    }, [requestPermissionAndToken]);

  // 3) 홈 첫 방문 자동 요청: outcome을 반환해 토스트에 사용 가능
  const requestOnceIfNeeded =
    useCallback(async (): Promise<PermissionOutcome> => {
      if (typeof window === "undefined") return "unsupported";

      const hasAsked = localStorage.getItem("fcm-asked") === "true";
      const shouldAsk = Notification.permission === "default" && !hasAsked;
      if (!shouldAsk) {
        // 이미 물었거나 default가 아님 → 현재 상태를 그대로 반환
        return (Notification.permission as PermissionOutcome) ?? "unsupported";
      }

      const outcome = await requestPermissionWithOutcome();
      localStorage.setItem("fcm-asked", "true");

      if (outcome === "granted") {
        await requestPermissionAndToken();
      }
      return outcome as PermissionOutcome;
    }, [requestPermissionAndToken]);

  return {
    requestPermissionViaButton,
    requestOnceIfNeeded,
  };
};
