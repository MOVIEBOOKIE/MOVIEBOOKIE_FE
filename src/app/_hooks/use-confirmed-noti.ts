"use client";

import { useEffect } from "react";
import { HostNotificationType } from "app/_types/noti";
import { useNotificationStore } from "app/_stores/use-noti";
import { useToast } from "app/_context/toast-context";

const EXCLUDED_CODES = [1, 2, 10, 11, 12];

export const useConfirmedNoti = ({
  eventId,
  buttonState,
}: {
  eventId: number;
  buttonState?: string;
}) => {
  const { hasBeenNotified, addNotification, addNotifiedEventId } =
    useNotificationStore.getState();
  const { showToast } = useToast();

  useEffect(() => {
    if (buttonState !== "티켓으로 이동") return;
    if (hasBeenNotified(eventId)) return;
    addNotifiedEventId(eventId);

    const code = HostNotificationType.RESERVATION_CONFIRMED;
    if (EXCLUDED_CODES.includes(code)) return;

    const notify = async () => {
      try {
        const res = await fetch(
          `/api/notifications/notifications/host/preview/${eventId}/${code}`,
        );
        if (!res.ok) throw new Error("알림 요청 실패");

        const result = await res.json();

        addNotification({
          eventId,
          code,
          title: result.title,
          body: result.body,
        });

        showToast({
          title: result.title,
          body: result.body,
          type: "success",
        });
      } catch (err) {
        console.error("대관 확정 알림 실패:", err);
      }
    };

    notify();
  }, [buttonState, eventId]);
};
