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

  notifiedEventIds: number[];
  addNotifiedEventId: (eventId: number) => void;
  hasBeenNotified: (eventId: number) => boolean;
  clearNotifiedEventIds: () => void;
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
          id: `${Date.now()}-${Math.random()}`, // 더 고유한 ID 생성
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

      // 중복 방지를 위한 상태 및 메서드
      notifiedEventIds: [],
      addNotifiedEventId: (eventId) => {
        const { notifiedEventIds } = get();
        if (!notifiedEventIds.includes(eventId)) {
          const newNotifiedEventIds = [...notifiedEventIds, eventId];
          console.log("이벤트 ID 추가:", { eventId, newNotifiedEventIds });
          set({
            notifiedEventIds: newNotifiedEventIds,
          });
        } else {
          console.log("이미 존재하는 이벤트 ID:", eventId);
        }
      },
      hasBeenNotified: (eventId) => {
        const hasNotified = get().notifiedEventIds.includes(eventId);
        console.log("알림 이력 확인:", {
          eventId,
          hasNotified,
          notifiedEventIds: get().notifiedEventIds,
        });
        return hasNotified;
      },
      clearNotifiedEventIds: () => {
        console.log("알림 이력 초기화");
        set({ notifiedEventIds: [] });
      },
    }),
    {
      name: "notification-storage",
      // persist 설정 개선
      partialize: (state) => ({
        notifications: state.notifications,
        unreadCount: state.unreadCount,
        notifiedEventIds: state.notifiedEventIds, // 중요: 이 부분이 저장되어야 함
      }),
      // 스토리지 복원 시 로그 추가
      onRehydrateStorage: () => (state) => {
        console.log("스토리지 복원 완료:", {
          notifiedEventIds: state?.notifiedEventIds || [],
          notifications: state?.notifications?.length || 0,
        });
      },
    },
  ),
);
