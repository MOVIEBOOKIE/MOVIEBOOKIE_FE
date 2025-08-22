"use client";

import { useState } from "react";
import { Card } from "@/components";
import Header from "@/components/header";
import Pagination from "@/components/pagination";
import { useCategoryPageEvents } from "app/_hooks/events/use-category-events";
import CardSkeleton from "@/components/card-skeleton";

export default function CategoryPageClient({ label }: { label: string }) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);

  const { data, isLoading } = useCategoryPageEvents(
    label,
    currentPage,
    itemsPerPage,
  );

  const cards = data?.eventList ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className="bg-gray-black min-h-screen">
      <Header title={label} showBackButton={true} showCloseButton={false} />

      <div className="flex min-h-screen flex-col justify-between px-4 pt-12.5">
        <div className="mt-6 flex-1">
          {isLoading ? (
            <div className="flex flex-col gap-4">
              {Array.from({ length: 3 }).map((_, idx) => (
                <CardSkeleton key={idx} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {cards.map((card, idx) => (
                <div key={card.eventId}>
                  <Card
                    id={String(card.eventId)}
                    imageUrl={card.posterImageUrl}
                    category={card.mediaType}
                    title={card.mediaTitle}
                    placeAndDate={`${card.locationName} · ${card.eventDate}`}
                    description={card.description}
                    ddayBadge={`D-${card.d_day}`}
                    statusBadge={card.eventStatus}
                    progressRate={`${card.rate}%`}
                    estimatedPrice={card.estimatedPrice}
                  />
                  {idx < cards.length - 1 && (
                    <div className="bg-border my-4 h-px w-full" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {!isLoading && cards.length > 0 && (
          <div className="pb-safe-bottom px-4 pb-9">
            <Pagination
              pageCount={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
