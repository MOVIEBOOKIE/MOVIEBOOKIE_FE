"use client";

import { useCallback, useEffect } from "react";
import { useFCM } from "./use-fcm";
import { devLog } from "@/utils/dev-logger";
import { requestPermissionWithOutcome } from "@/utils/fcm-noti";

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
      "Notification" in window &&
      Notification.permission === "granted"
    ) {
      requestPermissionAndToken();
    }
    onForegroundMessage((payload) => {
      devLog("📥 Foreground 알림 수신:", payload);
    });
  }, [requestPermissionAndToken, onForegroundMessage]);

  // 2) 홈 첫 방문 자동 요청: dismissed일 때는 다시 요청 가능하도록 수정
  const requestOnceIfNeeded =
    useCallback(async (): Promise<PermissionOutcome> => {
      if (typeof window === "undefined") return "unsupported";

      const hasAsked = localStorage.getItem("fcm-asked") === "true";
      const hasDenied = localStorage.getItem("fcm-denied") === "true";
      const currentPermission: PermissionOutcome =
        "Notification" in window
          ? (Notification.permission as PermissionOutcome)
          : "unsupported";

      if (currentPermission === "unsupported") {
        return "unsupported";
      }

      const shouldAsk =
        currentPermission === "default" && !hasAsked && !hasDenied;

      if (!shouldAsk) {
        return currentPermission ?? "unsupported";
      }

      const outcome = await requestPermissionWithOutcome();

      if (outcome !== "dismissed") {
        localStorage.setItem("fcm-asked", "true");
      }

      if (outcome === "denied") {
        localStorage.setItem("fcm-denied", "true");
      }

      if (outcome === "granted") {
        await requestPermissionAndToken();
      }
      return outcome as PermissionOutcome;
    }, [requestPermissionAndToken]);

  return {
    requestOnceIfNeeded,
  };
};
