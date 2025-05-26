import { create } from "zustand";

type ToastType = "checkbox" | "alert";

interface ToastState {
  message: string;
  type: ToastType;
  isVisible: boolean;
  showToast: (message: string, type?: ToastType) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  message: "",
  type: "checkbox",
  isVisible: false,
  showToast: (message, type = "checkbox") => {
    set({ message, type, isVisible: true });

    setTimeout(() => {
      set({ isVisible: false });
    }, 2000);
  },
  hideToast: () => set({ isVisible: false }),
}));
