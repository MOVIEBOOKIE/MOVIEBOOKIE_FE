import { NotificationItem } from "app/_types/noti";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type NotificationStatus = "confirm" | "cancel" | "check";

interface NotificationState {
  list: NotificationItem[];
  addNotification: (n: NotificationItem) => void;
  markAsRead: (index: number) => void;
  clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      list: [],
      addNotification: (noti) =>
        set((state) => {
          const newList = [noti, ...state.list].slice(0, 50);
          return { list: newList };
        }),
      markAsRead: (index) =>
        set((state) => {
          const updated = [...state.list];
          if (updated[index]) updated[index].isRead = true;
          return { list: updated };
        }),
      clearNotifications: () => set({ list: [] }),
    }),
    {
      name: "notifications-store",
    },
  ),
);
