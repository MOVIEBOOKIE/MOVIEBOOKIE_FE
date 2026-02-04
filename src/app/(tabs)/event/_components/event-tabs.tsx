"use client";

import { useRef, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ToggleTab, Card } from "@/components";
import CardSkeleton from "@/components/card-skeleton";
import { useInfiniteEventTabQuery } from "app/_hooks/events/use-event-tab-query";
import { EventCard } from "app/_types/card";
import { TOGGLE_LABELS } from "@/constants/event-tab";
import SkeletonGate from "@/components/skeleton-gate";

interface EventTabProps {
  type: "신청 목록" | "주최 목록";
}

export default function EventTab({ type }: EventTabProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromQuery = {
    from: "event",
    tab: searchParams.get("tab") ?? "apply",
    toggle: searchParams.get("toggle") ?? "0",
  };

  const toggleParam = Number(searchParams.get("toggle") ?? "0");
  const selectedIdx: 0 | 1 | 2 = [0, 1, 2].includes(toggleParam as number)
    ? (toggleParam as 0 | 1 | 2)
    : 0;

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteEventTabQuery({
      tab: type === "신청 목록" ? "apply" : "host",
      toggle: selectedIdx, // 0 모집 | 1 대관 | 2 취소
      pageSize: 10,
    });

  const events: EventCard[] = useMemo(
    () => data?.pages?.flatMap((page) => page) ?? [],
    [data],
  );
  const hasData = events.length > 0;

  const observer = useRef<IntersectionObserver | null>(null);
  const lastEventElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage, isFetchingNextPage, fetchNextPage],
  );

  const handleToggleChange = (label: string) => {
    const nextIdx = TOGGLE_LABELS.indexOf(label as any);
    const params = new URLSearchParams(searchParams);
    params.set("toggle", String(nextIdx < 0 ? 0 : nextIdx));
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="mt-5">
      <ToggleTab
        options={TOGGLE_LABELS as unknown as string[]}
        selected={TOGGLE_LABELS[selectedIdx]}
        onSelect={handleToggleChange}
      />

      <SkeletonGate
        key={`${type}-${selectedIdx}`}
        loading={isLoading}
        hasData={hasData}
        showAfterMs={150}
        minVisibleMs={350}
        fallback={
          <div className="overflow-anchor-none mt-6">
            <div className="mt-2 flex flex-col gap-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx}>
                  <CardSkeleton />
                  <div className="my-4 h-px w-full bg-gray-950" />
                </div>
              ))}
            </div>
          </div>
        }
        empty={
          <div className="overflow-anchor-none mt-6 flex flex-col items-center justify-center pt-11 text-center text-gray-900">
            <p className="body-3-medium mt-3.5 text-gray-800">
              {type}이 없습니다.
            </p>
          </div>
        }
      >
        <div className="overflow-anchor-none mt-6 flex flex-col">
          {events.map((event, index) => (
            <div
              key={event.eventId}
              ref={index === events.length - 1 ? lastEventElementRef : null}
            >
              <Card
                id={event.eventId}
                imageUrl={event.posterImageUrl}
                category={event.mediaType}
                title={event.mediaTitle}
                placeAndDate={`${event.locationName} · ${event.eventDate}`}
                description={event.description}
                ddayBadge={
                  event.d_day !== null ? `D-${event.d_day}` : undefined
                }
                statusBadge={event.eventStatus}
                progressRate={
                  event.rate !== undefined ? `${event.rate}%` : undefined
                }
                estimatedPrice={event.estimatedPrice}
                query={fromQuery}
              />
              {index < events.length - 1 && (
                <div className="my-4 h-px w-full bg-gray-950" />
              )}
            </div>
          ))}

          {isFetchingNextPage && (
            <div className="mt-4">
              <CardSkeleton />
            </div>
          )}
        </div>
      </SkeletonGate>
    </div>
  );
}
