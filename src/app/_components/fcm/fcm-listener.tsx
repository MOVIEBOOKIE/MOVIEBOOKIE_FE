"use client";

import { parseNotificationMeta } from "@/utils/map-noti";
import { useNotificationStore } from "app/_stores/use-noti";
import { useToastStore } from "app/_stores/use-toast-store";
import { onFirebaseMessage } from "app/lib/firebase-notification";
import { useEffect } from "react";

export default function FcmListener() {
  const { showToast } = useToastStore();
  const { addNotification } = useNotificationStore();

  useEffect(() => {
    console.log("✅ FcmListener mounted");

    const unsubscribe = onFirebaseMessage((payload) => {
      console.log("@@@@알림 수신:", payload);

      const now = new Date();
      const timeString = now.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const rawTitle = payload.notification?.title || "알림";
      const { shortTitle, status } = parseNotificationMeta(rawTitle);

      addNotification({
        type: shortTitle,
        title: rawTitle,
        description: payload.notification?.body || "",
        time: timeString,
        status,
        eventId: payload.data?.eventId
          ? Number(payload.data.eventId)
          : undefined,
        isRead: false,
      });

      showToast(payload.notification?.body || "새 알림이 도착했습니다!");
    });
  }, [addNotification, showToast]);

  return null;
}
