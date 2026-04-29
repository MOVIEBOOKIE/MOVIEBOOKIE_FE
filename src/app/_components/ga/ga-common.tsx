"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { setCommon } from "@/lib/gtm";
import { useGetUser } from "app/_hooks/use-user";
import SessionLifecycle from "./session-lifecycle";
import RouteTracker from "./route-tracker";

const SESSION_ID_KEY = "mb_session_id";
const USER_FETCH_DELAY_MS = 1500;

export default function GAOrchestrator() {
  const pathname = usePathname();
  const isGAEnabled = !!pathname && !pathname.startsWith("/login");

  const sidRef = useRef<string | null>(null);

  const [sidReady, setSidReady] = useState(false);
  const [ready, setReady] = useState(false);
  const [shouldFetchUser, setShouldFetchUser] = useState(false);

  useEffect(() => {
    if (!isGAEnabled) return;

    try {
      let sid = sessionStorage.getItem(SESSION_ID_KEY);

      if (!sid) {
        sid = crypto.randomUUID();
        sessionStorage.setItem(SESSION_ID_KEY, sid);
      }

      sidRef.current = sid;
      setSidReady(true);
    } catch {
      sidRef.current = sidRef.current ?? crypto.randomUUID();
      setSidReady(true);
    }
  }, [isGAEnabled]);

  useEffect(() => {
    if (!isGAEnabled) return;

    const timer = window.setTimeout(() => {
      setShouldFetchUser(true);
    }, USER_FETCH_DELAY_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isGAEnabled]);

  const { data } = useGetUser({
    enabled: isGAEnabled && shouldFetchUser,
  });

  const userId = data?.id ?? undefined;
  const siteType = data?.siteType ?? undefined;

  useEffect(() => {
    if (!isGAEnabled) return;
    if (!sidReady || !sidRef.current) return;

    setCommon({
      session_id: sidRef.current,
      user_id: userId,
      site_type: siteType,
    });

    setReady(true);
  }, [isGAEnabled, sidReady, userId, siteType]);

  if (!isGAEnabled || !ready) return null;

  return (
    <>
      <SessionLifecycle />
      <RouteTracker />
    </>
  );
}
