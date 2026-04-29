"use client";

import { useEffect, useRef } from "react";

import { ev } from "@/lib/gtm";
import { useMyPage } from "app/_hooks/auth/use-mypage";
import { useFCMHandler } from "app/_hooks/fcm/use-fcm-handler";
import { useUserStore } from "app/_stores/use-user-store";

export function useHomeSideEffects() {
  const user = useUserStore((state) => state.user);
  const { requestOnceIfNeeded } = useFCMHandler();

  useMyPage();

  useEffect(() => {
    if (user?.email) {
      requestOnceIfNeeded();
    }
  }, [user?.email, requestOnceIfNeeded]);

  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;

    fired.current = true;
    ev.homeView();
  }, []);
}
