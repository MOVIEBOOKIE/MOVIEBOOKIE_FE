"use client";

import { getMessaging, getToken, isSupported } from "firebase/messaging";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
};

let messagingInstance: ReturnType<typeof getMessaging> | null = null;

export const requestFcmToken = async () => {
  try {
    if (typeof window === "undefined") return;
    const supported = await isSupported();
    if (!supported) {
      console.warn("⚠️ FCM을 지원하지 않는 브라우저입니다.");
      return;
    }

    const app = initializeApp(firebaseConfig);
    messagingInstance = getMessaging(app);

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("🔒 알림 권한이 거부되었습니다.");
      return;
    }

    const token = await getToken(messagingInstance, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY!,
    });

    console.log("✅ FCM 토큰:", token);
    return token;
  } catch (error) {
    console.error("🔥 FCM 토큰 요청 중 오류 발생:", error);
    return null;
  }
};
