"use client";

import { useParams } from "next/navigation";

import CardFront from "./card-front";
import CardBack from "./card-back";
import { RotateIcon } from "@/icons/index";
import { useState } from "react";
import { useTicketDetail } from "app/_hooks/events/use-ticket-detail";
import CardFrontSkeleton from "./card-front-skeleton";

export default function TicketPage() {
  const { id } = useParams();
  const ticketId = Number(id);
  const { data: ticket, isLoading } = useTicketDetail(ticketId, {
    enabled: !isNaN(ticketId),
  });
  const [flipped, setFlipped] = useState(false);

  if (!ticketId)
    return (
      <p className="flex h-full items-center text-center text-white">
        티켓이 없습니다.
      </p>
    );

  return (
    <div className="flex h-full flex-col items-center justify-center gap-8.5">
      <div
        style={{ transformStyle: "preserve-3d" }}
        className={`transform-style-preserve-3d relative h-111.75 w-72.25 transition-transform duration-700 ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {isLoading ? <CardFrontSkeleton /> : <CardFront ticket={ticket} />}
        <CardBack ticket={ticket} />
      </div>
      <button
        type="button"
        className="rounded-full bg-white/20"
        onClick={() => setFlipped(!flipped)}
      >
        <RotateIcon />
      </button>
    </div>
  );
}
