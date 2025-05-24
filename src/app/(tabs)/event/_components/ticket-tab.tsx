"use client";

import { Card } from "./ticket-card";
import { EmptyTicketIcon } from "@/icons/index";
import { useTickets } from "app/_hooks/events/use-ticket";
import Loading from "app/loading";

export default function TicketTab() {
  const { data: tickets = [], isLoading } = useTickets();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="pb-24">
      <div className="mt-6 flex flex-col gap-5">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <div key={ticket.ticketId}>
              <Card
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
  );
}
