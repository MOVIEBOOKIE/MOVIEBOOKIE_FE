import { UserProfile } from "app/_types/user-profile";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: UserProfile | null;
  setUser: (user: UserProfile) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (partialUser) =>
        set((state) => ({
          user: {
            ...state.user,
            ...partialUser,
          },
        })),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "userProfile",
    },
  ),
);
