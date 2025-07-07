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
  unreadCount: number;
  _hasHydrated: boolean;

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
      unreadCount: 0,
      _hasHydrated: false,

      addNotification: (notification) => {
        const newNotification: NotificationItem = {
          ...notification,
          id: `${Date.now()}-${Math.random()}`,
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
            notifications: state.notifications.map((n) =>
              n.id === id ? { ...n, isRead: true } : n,
            ),
            unreadCount: wasUnread
              ? Math.max(0, state.unreadCount - 1)
              : state.unreadCount,
          };
        });
      },

      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({
            ...n,
            isRead: true,
          })),
          unreadCount: 0,
        }));
      },

      clearNotifications: () => {
        set({ notifications: [], unreadCount: 0 });
      },

      notifiedEventIds: [],
      addNotifiedEventId: (eventId) => {
        const { notifiedEventIds } = get();
        if (!notifiedEventIds.includes(eventId)) {
          const newNotifiedEventIds = [...notifiedEventIds, eventId];
          console.log("이벤트 ID 추가:", { eventId, newNotifiedEventIds });
          set({ notifiedEventIds: newNotifiedEventIds });
        }
      },
      hasBeenNotified: (eventId) => {
        return get().notifiedEventIds.includes(eventId);
      },
      clearNotifiedEventIds: () => {
        set({ notifiedEventIds: [] });
      },
    }),
    {
      name: "notification-storage",
      partialize: (state) => ({
        notifications: state.notifications,
        unreadCount: state.unreadCount,
        notifiedEventIds: state.notifiedEventIds,
      }),
      onRehydrateStorage: (state) => {
        return () => {
          console.log("✅ 스토리지 복원 완료");
          (state as any)?.setState?.({ _hasHydrated: true });
        };
      },
    },
  ),
);

// ✅ hydration 여부 체크용 훅
export const useNotificationHydration = () =>
  useNotificationStore((state) => state._hasHydrated);
