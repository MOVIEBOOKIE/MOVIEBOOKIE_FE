import { NotificationStatus } from "app/_stores/use-noti";

export interface NotificationItem {
  type: string;
  title: string;
  description: string;
  time: string;
  status: NotificationStatus;
  eventId?: number;
  isRead?: boolean;
}
