import { getToken, onMessage } from "firebase/messaging";
import { getFirebaseMessaging } from "@/lib/firebase-config";
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
      devLog("🔄 FCM 토큰 등록이 이미 진행 중이거나 완료됨");
      return;
    }

    // 이미 초기화 중인 경우 기존 Promise 반환
    if (initializationRef.current) {
      devLog("⏳ 기존 FCM 초기화 대기 중...");
      return initializationRef.current;
    }
    initializationRef.current = performTokenRegistration();

    try {
      await initializationRef.current;
    } finally {
      initializationRef.current = null;
    }
  }, []);

  const performTokenRegistration = async (): Promise<void> => {
    const isNotificationSupported =
      typeof window !== "undefined" && "Notification" in window;

    if (!isNotificationSupported) {
      devError("🚫 Notification API를 사용할 수 없는 환경입니다.");
      return;
    }

    isTokenRegistering = true;

    try {
      if (!("Notification" in window)) {
        devError("🚫 이 브라우저는 Notification API를 지원하지 않습니다.");
        return;
      }

      const permission =
        Notification.permission === "default"
          ? await Notification.requestPermission()
          : Notification.permission;

      devLog("🔐 권한 상태:", permission);

      if (permission !== "granted") {
        devLog("❌ 알림 권한이 허용되지 않았습니다.");
        return;
      }

      const messaging = await getFirebaseMessaging();
      if (!messaging) {
        devLog("❌ Firebase Messaging 초기화 실패");
        return;
      }

      const registration = await navigator.serviceWorker.ready.catch((err) => {
        devError("❌ Service Worker ready 실패:", err);
        return null;
      });

      if (!registration) return;

      let token: string | null = null;
      let attempt = 0;

      while (!token && attempt < MAX_TOKEN_RETRY) {
        try {
          token = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY!,
            serviceWorkerRegistration: registration,
          });
        } catch (err) {
          if (attempt === MAX_TOKEN_RETRY) break;
          devLog(`🔁 FCM 토큰 재시도 (${attempt}/${MAX_TOKEN_RETRY})`, err);
          await new Promise((res) => setTimeout(res, 1000 * attempt));
        }
      }

      if (!token) {
        devLog("❌ FCM 토큰 발급 실패 (최대 재시도 초과)");
        return;
      }

      // 이미 등록된 토큰과 같으면 중복 등록 방지
      if (registeredToken === token) {
        devLog("🔄 동일한 토큰이 이미 등록되어 있음:", token);
        return;
      }

      await registerFCMToken(token);
      registeredToken = token;
      devLog("🟢 등록된 토큰:", token);
    } catch (err) {
      devLog("❌ 전체 FCM 초기화 실패:", err);
    } finally {
      isTokenRegistering = false;
    }
  };

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
