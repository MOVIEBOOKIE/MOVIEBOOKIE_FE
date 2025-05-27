import { NotificationStatus } from "app/_stores/noti";

export interface NotificationItem {
  type: string;
  title: string;
  description: string;
  time: string;
  status: NotificationStatus;
  eventId?: number;
  isRead?: boolean;
}
