"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { setCommon } from "@/lib/gtm";
import { useGetUser } from "app/_hooks/use-user";
import SessionLifecycle from "./session-lifecycle";
import RouteTracker from "./route-tracker";

export default function GAOrchestrator() {
  // 1) 훅은 항상 호출
  const pathname = usePathname();
  const isGAEnabled = !!pathname && !pathname.startsWith("/login");

  // /login에서는 호출 자체를 비활성화
  const { data } = useGetUser({ enabled: isGAEnabled });
  const userId = data?.id ?? null;
  const siteType = data?.siteType;

  const sidRef = useRef<string | null>(null);
  const [sidReady, setSidReady] = useState(false);
  const [ready, setReady] = useState(false);

  // 2) 세션 ID 생성 (가드)
  useEffect(() => {
    if (!isGAEnabled) return;

    try {
      const KEY = "mb_session_id";
      let sid = sessionStorage.getItem(KEY);
      if (!sid) {
        sid = crypto.randomUUID();
        sessionStorage.setItem(KEY, sid);
      }
      sidRef.current = sid;
      setSidReady(true);
    } catch {
      // storage 불가 환경 대비
      sidRef.current = sidRef.current ?? crypto.randomUUID();
      setSidReady(true);
    }
  }, [isGAEnabled]);

  // 3) 공통 파라미터 세팅 (가드)
  useEffect(() => {
    if (!isGAEnabled) return;
    if (userId == null) return;
    if (!sidReady || !sidRef.current) return;

    setCommon({
      session_id: sidRef.current,
      user_id: userId,
      site_type: siteType,
    });

    setReady(true);
  }, [isGAEnabled, userId, siteType, sidReady]);

  // 4) 렌더 제어
  if (!isGAEnabled || !ready) return null;

  return (
    <>
      <SessionLifecycle />
      <RouteTracker />
    </>
  );
}
