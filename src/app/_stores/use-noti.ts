import { NotificationItem } from "app/_types/noti";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type NotificationStatus = "confirm" | "cancel" | "check";

interface NotificationState {
  list: NotificationItem[];
  addNotification: (noti: NotificationItem) => void;
  markAsRead: (index: number) => void;
  clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      list: [],
      addNotification: (noti) =>
        set((state) => ({ list: [noti, ...state.list] })),
      markAsRead: (index) =>
        set((state) => {
          const updated = [...state.list];
          updated[index] = { ...updated[index], isRead: true };
          return { list: updated };
        }),
      clearNotifications: () => set({ list: [] }),
    }),
    { name: "notification-store" },
  ),
);
