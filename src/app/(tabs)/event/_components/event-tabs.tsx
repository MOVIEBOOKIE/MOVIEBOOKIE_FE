"use client";

import { useState } from "react";
import { ToggleTab, Card } from "@/components";
import { EmptyIcon } from "@/icons/index";
import {
  ToggleType,
  useEventTabQuery,
} from "app/_hooks/events/use-event-tab-query";
import { EVENT_TOGGLES } from "@/constants/event-tab";

interface EventTabProps {
  type: "신청 목록" | "내 이벤트";
}

export default function EventTab({ type }: EventTabProps) {
  const toggles =
    type === "신청 목록"
      ? EVENT_TOGGLES.APPLY.LABELS
      : EVENT_TOGGLES.MINE.LABELS;

  const [selectedToggle, setSelectedToggle] = useState(toggles[0]);

  const { data: events = [], isError } = useEventTabQuery(
    type,
    selectedToggle as ToggleType,
  );

  if (isError) {
    return <p className="text-center">이벤트를 불러오지 못했습니다.</p>;
  }

  return (
    <div className="mt-5">
      <ToggleTab
        options={toggles}
        selected={selectedToggle}
        onSelect={(selected) => setSelectedToggle(selected)}
      />

      <div className="mt-6 flex flex-col">
        {events.length > 0 ? (
          events.map((event, index) => (
            <div key={event.eventId}>
              <Card
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
          ))
        ) : (
          <div className="flex flex-col items-center justify-center pt-11 text-center text-gray-500">
            <EmptyIcon />
            <p className="body-3-medium mt-3.5 text-gray-800">
              아직 {type} 이벤트가 없어요 <br />
              지금 바로 나만의 이벤트를 만들어보세요
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
