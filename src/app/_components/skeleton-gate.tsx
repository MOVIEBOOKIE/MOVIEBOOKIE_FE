"use client";
import { ReactNode, useRef } from "react";
import { useLoadingGate } from "app/_hooks/use-loading-gate";

type Props = {
  loading: boolean;
  hasData: boolean;
  fallback: ReactNode; // 스켈레톤 UI
  empty?: ReactNode; // 빈 상태 UI
  children: ReactNode; // 실제 컨텐츠
  showAfterMs?: number; // 짧은 로딩은 숨김
  minVisibleMs?: number; // 한 번 뜨면 최소 유지
};

export default function SkeletonGate({
  loading,
  hasData,
  fallback,
  empty,
  children,
  showAfterMs = 150,
  minVisibleMs = 350,
}: Props) {
  const showSkeleton = useLoadingGate(loading, { showAfterMs, minVisibleMs });

  const everHadDataRef = useRef<boolean>(hasData);
  if (hasData && !everHadDataRef.current) everHadDataRef.current = true;

  if (!everHadDataRef.current && !hasData && showSkeleton)
    return <>{fallback}</>;

  if (!loading && !hasData) return <>{empty ?? null}</>;

  return <>{children}</>;
}
