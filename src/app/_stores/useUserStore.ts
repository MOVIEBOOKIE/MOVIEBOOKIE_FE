import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserProfile {
  email: string;
  nickname: string;
  profileImage: string;
  userTypeTitle: string;
  hostExperienceCount: number;
  participationExperienceCount: number;
  ticketCount: number;
  phoneNumber: String;
}

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
