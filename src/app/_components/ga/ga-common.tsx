"use client";
import { setCommon } from "@/lib/gtm";
import { useEffect } from "react";

export default function GACommon({
  userId,
  siteType = "core",
}: {
  userId?: string;
  siteType?: "core" | "admin";
}) {
  useEffect(() => {
    // 세션ID는 탭 단위로 1회 생성
    const key = "mb_session_id";
    const sid = sessionStorage.getItem(key) ?? crypto.randomUUID();
    sessionStorage.setItem(key, sid);
    setCommon({ site_type: siteType, session_id: sid, user_id: userId });
  }, [userId, siteType]);
  return null;
}
