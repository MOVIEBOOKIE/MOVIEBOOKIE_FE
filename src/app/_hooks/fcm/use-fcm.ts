import { getToken, onMessage } from "firebase/messaging";
import { getFirebaseMessaging } from "app/_lib/firebase-config";
import { registerFCMToken } from "app/_apis/register-fcm-token";

const MAX_TOKEN_RETRY = 3;

export const useFCM = () => {
  const requestPermissionAndToken = async () => {
    console.log("✅ requestPermissionAndToken 호출됨");

    const isNotificationSupported =
      typeof window !== "undefined" && "Notification" in window;

    if (!isNotificationSupported) {
      console.warn("🚫 Notification API를 사용할 수 없는 환경입니다.");
      return;
    }

    try {
      if (!("Notification" in window)) {
        console.warn("🚫 이 브라우저는 Notification API를 지원하지 않습니다.");
        return;
      }

      const permission =
        Notification.permission === "default"
          ? await Notification.requestPermission()
          : Notification.permission;

      console.log("🔐 권한 상태:", permission);

      if (permission !== "granted") {
        console.warn("❌ 알림 권한이 허용되지 않았습니다.");
        return;
      }

      const messaging = await getFirebaseMessaging();
      if (!messaging) {
        console.error("❌ Firebase Messaging 초기화 실패");
        return;
      }

      const registration = await navigator.serviceWorker.ready.catch((err) => {
        console.error("❌ Service Worker ready 실패:", err);
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
          console.log("📬 발급된 FCM 토큰:", token);
        } catch (err) {
          attempt++;
          console.warn(
            `🔁 FCM 토큰 재시도 (${attempt}/${MAX_TOKEN_RETRY})`,
            err,
          );
          await new Promise((res) => setTimeout(res, 1000 * attempt));
        }
      }

      if (!token) {
        console.error("❌ FCM 토큰 발급 실패 (최대 재시도 초과)");
        return;
      }

      await registerFCMToken(token);
      console.log("🟢 등록된 토큰:", token);
    } catch (err) {
      console.error("❌ 전체 FCM 초기화 실패:", err);
    }
  };

  const onForegroundMessage = (callback: (payload: any) => void) => {
    getFirebaseMessaging().then((messaging) => {
      if (!messaging) {
        console.warn("⚠️ messaging 객체 없음");
        return;
      }
      console.log("📥 onForegroundMessage 등록");
      onMessage(messaging, callback);
    });
  };

  return { requestPermissionAndToken, onForegroundMessage };
};
