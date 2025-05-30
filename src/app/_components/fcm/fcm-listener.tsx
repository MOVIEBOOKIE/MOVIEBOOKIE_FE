"use client";

import { devLog } from "@/utils/dev-logger";
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
    devLog("✅ FcmListener mounted");

    const unsubscribe = onFirebaseMessage((payload) => {
      console.log("@@@@ 알림 수신:", payload);
      devLog("@@@@ 알림 수신:", payload);

      const now = new Date();
      const timeString = now.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
      });

      // ✅ title/body를 data에서 무조건 파싱
      const rawTitle = payload.data?.title || "알림";
      const body = payload.data?.body || "내용 없음";
      const eventId = payload.data?.eventId;

      const { shortTitle, status } = parseNotificationMeta(rawTitle);

      addNotification({
        type: shortTitle,
        title: rawTitle,
        description: body,
        time: timeString,
        status,
        eventId: eventId ? Number(eventId) : undefined,
        isRead: false,
      });

      showToast(body); // ✅ 토스트 표시
    });
  }, [addNotification, showToast]);

  return null;
}
