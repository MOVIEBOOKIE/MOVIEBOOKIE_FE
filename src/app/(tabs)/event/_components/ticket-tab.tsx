"use client";

import { Card } from "./ticket-card";
import { EmptyTicketIcon } from "@/icons/index";
import { MOCK_DATA } from "@/mocks/mock-data";
import { mapEventCardToCardProps } from "@/utils/map-to-eventcard";

export default function TicketTab() {
  const filteredEvents = MOCK_DATA.filter((event) =>
    ["대관확정", "상영완료"].includes(event.statusBadge),
  );

  return (
    <div className="pb-24">
      <div className="mt-6 flex flex-col gap-5">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <div key={index}>
              <Card {...mapEventCardToCardProps(event)} />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center pt-11 text-center text-gray-500">
            <EmptyTicketIcon />
            <p className="body-3-medium mt-3.5 text-gray-800">
              아직 이벤트 티켓이 없어요 <br />
              지금 바로 다양한 이벤트에 참여해보세요
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
