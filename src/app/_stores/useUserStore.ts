import { create } from "zustand";

interface UserProfile {
  email: string;
  nickname: string;
  profileImage: string;
}

interface UserState {
  user: UserProfile | null;
  setUser: (user: UserProfile) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
    localStorage.setItem("userProfile", JSON.stringify(user));
  },
  clearUser: () => {
    set({ user: null });
    localStorage.removeItem("userProfile");
  },
}));
