import { devLog } from "@/utils/dev-logger";
import { messagingPromise } from "./firebase";
import { getToken, onMessage } from "firebase/messaging";

const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

export const requestNotificationPermission = async () => {
  if (typeof window === "undefined") return null;

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return null;

  const messaging = await messagingPromise;
  if (!messaging) return null;

  try {
    // ✅ 서비스 워커 명시적으로 등록
    const registration =
      await navigator.serviceWorker.register("/custom-sw/sw.js");

    const token = await getToken(messaging, {
      vapidKey,
      serviceWorkerRegistration: registration, // 중요!!
    });

    console.log("✅ FCM 토큰 발급됨:", token);
    devLog("✅ FCM 토큰 발급됨:", token);

    return token;
  } catch (err) {
    console.error("❌ FCM 토큰 요청 실패", err);
    return null;
  }
};

export const onFirebaseMessage = async (callback: (payload: any) => void) => {
  const messaging = await messagingPromise;
  if (!messaging) {
    console.warn("❌ messaging is null - 브라우저에서 FCM 미지원일 수 있음");
    return;
  }
  console.log("✅ Firebase messaging 준비 완료");
  onMessage(messaging, callback);
};

console.log("🔥 요청한 VAPID 키:", vapidKey);
