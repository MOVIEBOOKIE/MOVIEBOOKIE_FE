"use client";

import { useCallback, useEffect, useRef } from "react";
import { apiGet } from "app/_apis/methods";
import { useNotificationStore } from "app/_stores/use-noti";
import {
  NOTIFICATION_POLLING_ACTIVE_INTERVAL,
  NOTIFICATION_POLLING_BACKGROUND_INTERVAL,
  NOTIFICATION_MINIMUM_CHECK_INTERVAL,
} from "app/_constants/time";
import { devError, devLog } from "@/utils/dev-logger";

export function useSmartNotiPolling() {
  const setHasUnread = useNotificationStore.getState().setHasUnread;

  const intervalRef = useRef<NodeJS.Timeout | null>(null); // 현재 폴링 interval ID 저장
  const isActiveRef = useRef(true); // 현재 앱이 활성 상태인지 여부
  const lastCheckRef = useRef<number>(0); // 마지막 API 호출 시각 저장
  const isCheckingRef = useRef<boolean>(false); // API 호출 중인지 확인

  const checkUnread = useCallback(
    async (isBackground = false) => {
      if (isCheckingRef.current) {
        return;
      }
      try {
        const now = Date.now();
        if (
          isBackground &&
          now - lastCheckRef.current < NOTIFICATION_MINIMUM_CHECK_INTERVAL
        ) {
          return;
        }
        lastCheckRef.current = now;

        const res: boolean | { result?: boolean } = await apiGet(
          "/notifications/unread",
        );
        const isUnread = typeof res === "boolean" ? res : res?.result;
        devLog(
          `새 알림 존재 여부 (${isBackground ? "background" : "active"}):`,
          isUnread,
        );
        setHasUnread(isUnread === true);
      } catch (error) {
        devError("읽지 않은 알림 상태 조회 실패:", error);
      }
    },
    [setHasUnread],
  );

  const startPolling = useCallback(() => {
    if (!isActiveRef.current) return; // 비활성 상태면 폴링 시작 안 함
    if (intervalRef.current) return;
    const interval = isActiveRef.current
      ? NOTIFICATION_POLLING_ACTIVE_INTERVAL
      : NOTIFICATION_POLLING_BACKGROUND_INTERVAL;

    intervalRef.current = setInterval(() => {
      checkUnread(!isActiveRef.current);
    }, interval);
  }, [checkUnread]);

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const restartPolling = useCallback(() => {
    stopPolling();
    startPolling();
  }, [stopPolling, startPolling]);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      devLog("# 알림 폴링 일시 중지됨 (dev모드 개발 중)");
      return;
    }
    checkUnread(); // 최초 1회 요청
    startPolling(); // 폴링 시작

    const handleVisibilityChange = () => {
      const isVisible = !document.hidden;
      const wasActive = isActiveRef.current;
      isActiveRef.current = isVisible;

      if (wasActive !== isVisible) {
        if (isVisible) {
          devLog("앱 활성화 - 폴링 간격 30초");
          checkUnread();
          restartPolling();
        } else {
          devLog("앱 비활성화 - 폴링 간격 2분");
          restartPolling();
        }
      }
    };

    const handleOnline = () => {
      devLog("네트워크 연결됨 - 즉시 알림 체크");
      checkUnread();
      if (!intervalRef.current) startPolling();
    };

    const handleOffline = () => {
      devLog("네트워크 끊어짐 - 폴링 중단");
      stopPolling();
    };

    const handleFocus = () => {
      if (!document.hidden) {
        devLog("페이지 포커스 - 즉시 알림 체크");
        checkUnread();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("focus", handleFocus);
      stopPolling();
    };
  }, [checkUnread, startPolling, restartPolling, stopPolling]);

  return { checkUnread };
}
