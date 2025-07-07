// hooks/useFCM.ts
import { getToken, onMessage } from "firebase/messaging";
import { getFirebaseMessaging } from "app/_lib/firebase-config";
import { registerFCMToken } from "app/_apis/register-fcm-token";

export const useFCM = () => {
  const requestPermissionAndToken = async () => {
    console.log("✅ requestPermissionAndToken 호출됨");

    try {
      const permission = await Notification.requestPermission();
      console.log("🔐 권한 상태:", permission);
      if (permission !== "granted") return;

      const messaging = await getFirebaseMessaging();
      console.log("🔥 messaging 객체:", messaging);
      const registration = await navigator.serviceWorker.ready;

      const token = await getToken(messaging!, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY!,
        serviceWorkerRegistration: registration,
      });

      console.log("📬 발급된 FCM 토큰:", token);
      await registerFCMToken(token);
      console.log("🟢등록된 토큰:", token);
    } catch (err) {
      console.error("❌ FCM 초기화 실패:", err);
    }
  };

  const getCurrentFCMToken = async () => {
    try {
      const messaging = await getFirebaseMessaging();
      const registration = await navigator.serviceWorker.ready;

      const token = await getToken(messaging!, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY!,
        serviceWorkerRegistration: registration,
      });

      return token;
    } catch (err) {
      console.error("❌ FCM 토큰 가져오기 실패:", err);
      return null;
    }
  };
  const onForegroundMessage = (callback: (payload: any) => void) => {
    getFirebaseMessaging().then((messaging) => {
      console.log("onForegroundMessage 등록");
      if (!messaging) {
        console.warn(" messaging 객체 없음");
        return;
      }
      console.log("onMessage 리스너 등록");
      onMessage(messaging, callback);
    });
  };

  return { requestPermissionAndToken, onForegroundMessage, getCurrentFCMToken };
};
