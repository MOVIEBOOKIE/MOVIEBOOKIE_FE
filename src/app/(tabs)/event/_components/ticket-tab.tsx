"use client";

import { MOVIE_LISTS } from "@/mocks/movie-list";
import { Card } from "./ticket-card";

export default function TicketTab() {
  const filteredEvents = MOVIE_LISTS.filter((event) =>
    ["대관확정", "상영완료"].includes(event.statusBadge),
  );

  return (
    <div className="pb-24">
      <div className="mt-6 flex flex-col gap-5">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <div key={index}>
              <Card
                imageUrl={event.imageUrl}
                category={event.category}
                title={event.title}
                placeAndDate={event.placeAndDate}
                description={event.description}
                statusBadge={event.statusBadge}
                progressRate={event.progressRate}
                estimatedPrice={event.estimatedPrice}
              />
            </div>
          ))
        ) : (
          <p className="mt-8 text-center text-gray-500">
            등록된 티켓이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
