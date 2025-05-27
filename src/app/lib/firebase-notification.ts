import { messagingPromise } from "./firebase";
import { getToken, onMessage } from "firebase/messaging";

const vapidKey =
  "BDF4NxVFQnNfoxSiJMtSdZdG-T6mvX_6hJHoN_7-FxUZLPMIMQxfyXLASmdCJ5pcvifKblKGGe_Otr56aZab-84";

export const requestNotificationPermission = async () => {
  if (typeof window === "undefined") return null;

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return null;

  const messaging = await messagingPromise;
  if (!messaging) return null;

  try {
    const token = await getToken(messaging, { vapidKey });
    return token;
  } catch (err) {
    console.error("FCM 토큰 요청 실패", err);
    return null;
  }
};

export const onFirebaseMessage = async (callback: (payload: any) => void) => {
  const messaging = await messagingPromise;
  if (messaging) {
    onMessage(messaging, callback);
  }
};
