import { create } from "zustand";

interface NotificationStore {
  hasUnread: boolean;
  setHasUnread: (v: boolean) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  hasUnread: false,
  setHasUnread: (v) => set({ hasUnread: v }),
}));
