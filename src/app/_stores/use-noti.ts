import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface NotificationItem {
  id: string;
  eventId: number;
  code: number;
  title: string;
  body: string;
  createdAt: string;
  isRead: boolean;
}

interface NotificationStore {
  notifications: NotificationItem[];
  list: NotificationItem[]; // 별칭
  unreadCount: number;

  addNotification: (
    notification: Omit<NotificationItem, "id" | "createdAt" | "isRead">,
  ) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;

  // ✅ 추가: 중복 알림 방지를 위한 상태
  notifiedEventIds: number[];
  addNotifiedEventId: (eventId: number) => void;
  hasBeenNotified: (eventId: number) => boolean;
}

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set, get) => ({
      notifications: [],
      get list() {
        return get().notifications;
      },
      unreadCount: 0,

      addNotification: (notification) => {
        const newNotification: NotificationItem = {
          ...notification,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          isRead: false,
        };

        set((state) => ({
          notifications: [newNotification, ...state.notifications],
          unreadCount: state.unreadCount + 1,
        }));
      },

      markAsRead: (id) => {
        set((state) => {
          const notification = state.notifications.find((n) => n.id === id);
          const wasUnread = notification && !notification.isRead;

          return {
            notifications: state.notifications.map((notification) =>
              notification.id === id
                ? { ...notification, isRead: true }
                : notification,
            ),
            unreadCount: wasUnread
              ? Math.max(0, state.unreadCount - 1)
              : state.unreadCount,
          };
        });
      },

      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((notification) => ({
            ...notification,
            isRead: true,
          })),
          unreadCount: 0,
        }));
      },

      clearNotifications: () => {
        set({ notifications: [], unreadCount: 0 });
      },

      // ✅ 중복 방지를 위한 추가 상태 및 메서드
      notifiedEventIds: [],
      addNotifiedEventId: (eventId) => {
        const { notifiedEventIds } = get();
        if (!notifiedEventIds.includes(eventId)) {
          set({
            notifiedEventIds: [...notifiedEventIds, eventId],
          });
        }
      },
      hasBeenNotified: (eventId) => {
        return get().notifiedEventIds.includes(eventId);
      },
    }),
    {
      name: "notification-storage",
    },
  ),
);
