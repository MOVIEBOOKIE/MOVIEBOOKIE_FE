"use client";

import { useUserStore } from "app/_stores/useUserStore";
import { useEffect } from "react";

export default function UserInitializer() {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("userProfile");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.email && parsed.nickname && parsed.profileImage) {
          setUser(parsed);
        }
      } catch (e) {
        console.error("userProfile 파싱 실패", e);
      }
    }
  }, [setUser]);

  return null;
}
