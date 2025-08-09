"use client";

import { EmptyTicketIcon } from "@/icons/index";
import { useTickets } from "app/_hooks/events/use-ticket";
import TicketSkeletonCard from "./components/ticket-skeleton-card";
import { TicketCard } from "./components/ticket-card";
import { FixedLayout } from "@/components";

export default function Ticket() {
  const { data: tickets = [], isLoading } = useTickets();

  return (
    <FixedLayout
      title="티켓"
      showBackButton
      isHeader
      showBottomButton={false}
      state="default"
    >
      <div>
        <div className="mt-6 flex flex-col gap-5">
          {isLoading ? (
            [...Array(2)].map((_, idx) => (
              <div key={idx}>
                <TicketSkeletonCard />
              </div>
            ))
          ) : tickets.length > 0 ? (
            tickets.map((ticket) => (
              <div key={ticket.ticketId}>
                <TicketCard
                  id={ticket.ticketId}
                  imageUrl={ticket.eventImageUrl}
                  title={ticket.title}
                  placeAndDate={`${ticket.location} · ${ticket.scheduledAt}`}
                  description={ticket.description}
                  ddayBadge={null}
                  progressRate={undefined}
                  estimatedPrice={undefined}
                />
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
    </FixedLayout>
  );
}
