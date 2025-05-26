"use client";

import { useEffect } from "react";
import axios from "axios";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../../../firebase-config";
import { apiPost } from "app/_apis/methods";

export const useFCM = () => {
  useEffect(() => {
    const initFCM = async () => {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") return;

      const token = await getToken(messaging, {
        vapidKey:
          "BPWn-MZ2EPnxIao3VaF6xvyIO-0WbNkbZKBuj_s9N4wjc1JMf_mVM-EMhpavALiERzRHVWj1oame0WlSTwpn9Io",
      });

      console.log("FCM 토큰:", token);

      await apiPost("/notifications/register-token", { token });
    };

    initFCM();

    // 포그라운드 알림 수신 핸들러
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("📥 알림 도착!", payload);
      alert(payload.notification?.title);
    });

    // 정리 함수
    return () => {
      unsubscribe();
    };
  }, []);
};
