import { getToken, onMessage } from "firebase/messaging";
import { getFirebaseMessaging } from "app/_lib/firebase-config";
import { registerFCMToken } from "app/_apis/register-fcm-token";

const MAX_TOKEN_RETRY = 3;

export const useFCM = () => {
  const requestPermissionAndToken = async () => {
    console.log("✅ requestPermissionAndToken 호출됨");

    try {
      const permission = await Notification.requestPermission();
      console.log("🔐 권한 상태:", permission);
      if (permission === "denied") {
        alert(
          "알림 권한이 차단되어 있어 권한 요청을 다시 띄울 수 없습니다.\n브라우저 설정에서 알림 권한을 허용해주세요.",
        );
        return;
      }

      const messaging = await getFirebaseMessaging();
      const registration = await navigator.serviceWorker.ready;

      let token: string | null = null;
      let attempt = 0;

      while (!token && attempt < MAX_TOKEN_RETRY) {
        try {
          token = await getToken(messaging!, {
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
          await new Promise((res) => setTimeout(res, 1000 * attempt)); // 점진적 backoff
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
      console.log("onForegroundMessage 등록");
      if (!messaging) {
        console.warn("⚠️ messaging 객체 없음");
        return;
      }
      onMessage(messaging, callback);
    });
  };

  return { requestPermissionAndToken, onForegroundMessage };
};
