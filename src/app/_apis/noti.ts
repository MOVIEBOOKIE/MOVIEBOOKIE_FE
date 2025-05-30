// src/app/_apis/notification.ts
import { apiGet } from "./methods";

export const fetchPreviewNotification = async (
  eventId: number,
  code: string,
): Promise<{ title: string; body: string }> => {
  return await apiGet(
    `/notifications/notifications/preview/participant/${eventId}/${code}`,
  );
};
