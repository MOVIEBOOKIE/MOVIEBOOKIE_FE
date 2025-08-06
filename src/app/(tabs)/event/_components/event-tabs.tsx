"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ToggleTab, Card } from "@/components";
import { EmptyIcon } from "@/icons/index";
import { EVENT_TOGGLES, ToggleType } from "@/constants/event-tab";
import { useInfiniteEventTabQuery } from "app/_hooks/events/use-event-tab-query";
import CardSkeleton from "@/components/card-skeleton";
import { EventCard } from "app/_types/card";

interface EventTabProps {
  type: "신청 목록" | "내 이벤트";
}

export default function EventTab({ type }: EventTabProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const toggleParam = searchParams.get("toggle");
  const isConfirmed = toggleParam === "confirmed";

  const toggles =
    type === "신청 목록"
      ? EVENT_TOGGLES.APPLY.LABELS
      : EVENT_TOGGLES.MINE.LABELS;

  const [selectedToggle, setSelectedToggle] = useState<ToggleType>(
    isConfirmed ? "확정 이벤트" : toggles[0],
  );

  useEffect(() => {
    setSelectedToggle(isConfirmed ? "확정 이벤트" : toggles[0]);
  }, [type, toggleParam, isConfirmed, toggles]);

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteEventTabQuery(type, selectedToggle);

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

  const events: EventCard[] =
    data?.pages.flatMap((page) => (Array.isArray(page) ? page : [])) ?? [];

  const handleToggleChange = (selected: string) => {
    setSelectedToggle(selected as ToggleType);
    const params = new URLSearchParams(searchParams.toString());

    if (selected === "확정 이벤트") {
      params.set("toggle", "confirmed");
    } else {
      params.delete("toggle");
    }

    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="mt-5">
      <ToggleTab
        options={toggles}
        selected={selectedToggle}
        onSelect={handleToggleChange}
      />

      <div className="overflow-anchor-none mt-6 flex flex-col">
        {isLoading ? (
          <div className="mt-2 flex flex-col gap-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx}>
                <CardSkeleton />
                <div className="my-4 h-px w-full bg-gray-950" />
              </div>
            ))}
          </div>
        ) : events.length > 0 ? (
          <>
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
                />
                {index < events.length - 1 && (
                  <div className="my-4 h-px w-full bg-gray-950" />
                )}
              </div>
            ))}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center pt-11 text-center text-gray-900">
            <EmptyIcon />
            <p className="body-3-medium mt-3.5 text-gray-800">
              아직 {type} 이벤트가 없어요 <br /> 지금 바로 나만의 이벤트를
              만들어보세요
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
