// app/_hooks/notifications/use-notifications.ts
import { useQuery } from "@tanstack/react-query";
import { NotificationPreview } from "app/_types/noti";

// 참가자 알림 미리보기 가져오기
export const useGetParticipantNotificationPreview = (
  eventId: number,
  code: number,
  options?: { enabled?: boolean },
) => {
  return useQuery({
    queryKey: ["notification", "participant", "preview", eventId, code],
    queryFn: async (): Promise<NotificationPreview> => {
      const response = await fetch(
        `/api/notifications/notifications/preview/participant/${eventId}/${code}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch participant notification preview");
      }
      return response.json();
    },
    ...options,
  });
};

// 호스트 알림 미리보기 가져오기
export const useGetHostNotificationPreview = (
  eventId: number,
  code: number,
  options?: { enabled?: boolean },
) => {
  return useQuery({
    queryKey: ["notification", "host", "preview", eventId, code],
    queryFn: async (): Promise<NotificationPreview> => {
      const response = await fetch(
        `/api/notifications/notifications/host/preview/${eventId}/${code}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch host notification preview");
      }
      return response.json();
    },
    ...options,
  });
};
