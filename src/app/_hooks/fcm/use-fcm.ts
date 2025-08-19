import { getToken, onMessage } from "firebase/messaging";
import { getFirebaseMessaging } from "app/_lib/firebase-config";
import { registerFCMToken } from "app/_apis/register-fcm-token";
import { useCallback, useRef } from "react";
import { devError, devLog } from "@/utils/dev-logger";

const MAX_TOKEN_RETRY = 3;

let isTokenRegistering = false;
let registeredToken: string | null = null;

export const useFCM = () => {
  const initializationRef = useRef<Promise<void> | null>(null);

  const requestPermissionAndToken = useCallback(async () => {
    if (typeof Notification === "undefined") {
      devError("🚫 Notification API를 사용할 수 없는 환경입니다.");
      return;
    }

    // 이미 등록 중이거나 등록된 토큰이 있으면 중복 실행 방지
    if (isTokenRegistering || registeredToken) {
      console.log("🔄 FCM 토큰 등록이 이미 진행 중이거나 완료됨");
      return;
    }

    // 이미 초기화 중인 경우 기존 Promise 반환
    if (initializationRef.current) {
      console.log("⏳ 기존 FCM 초기화 대기 중...");
      return initializationRef.current;
    }
    try {
      await initializationRef.current;
    } finally {
      initializationRef.current = null;
    }
  }, []);

  const onForegroundMessage = useCallback(
    (callback: (payload: any) => void) => {
      if (typeof Notification === "undefined") {
        devLog("⚠️ 알림을 지원하지 않는 환경입니다.");
        return;
      }

      let unsubscribe: (() => void) | undefined;
      getFirebaseMessaging().then((messaging) => {
        if (!messaging) {
          devLog("⚠️ messaging 객체 없음");
          return;
        }
        devLog("📥 onForegroundMessage 등록");
        unsubscribe = onMessage(messaging, callback);
      });
      return () => {
        try {
          unsubscribe?.();
        } catch {}
      };
    },
    [],
  );

  return { requestPermissionAndToken, onForegroundMessage };
};
