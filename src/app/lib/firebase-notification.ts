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
