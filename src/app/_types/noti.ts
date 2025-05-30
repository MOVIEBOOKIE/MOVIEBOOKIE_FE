// export interface NotificationItem {
//   type: string;
//   title: string;
//   description: string;
//   time: string;
//   status: NotificationStatus;
//   eventId?: number;
//   isRead?: boolean;
// }
// app/_types/notification.ts
export interface NotificationPreview {
  title: string;
  body: string;
}

export interface NotificationItem extends NotificationPreview {
  id: string;
  eventId: number;
  code: number;
  createdAt: string;
  isRead: boolean;
}

export const HostNotificationType = {
  EVENT_CREATED: 1,
  EVENT_DELETED: 2,
  RECRUITMENT_CANCELLED: 3,
  RECRUITMENT_COMPLETED: 4,
  RESERVATION_CONFIRMED: 5,
  RESERVATION_DENIED: 6,
  SCREENING_COMPLETED: 7,
} as const;

export const ParticipantNotificationType = {
  APPLY_COMPLETED: 10,
  APPLY_CANCEL: 11,
  EVENT_DELETED: 12,
  RECRUITMENT_CANCELLED: 13,
  RECRUITMENT_COMPLETED: 14,
  RESERVATION_NOT_APPLIED: 15,
  RESERVATION_CONFIRMED: 16,
  SCREENING_COMPLETED: 17,
} as const;

export type HostNotificationCode =
  (typeof HostNotificationType)[keyof typeof HostNotificationType];
export type ParticipantNotificationCode =
  (typeof ParticipantNotificationType)[keyof typeof ParticipantNotificationType];
