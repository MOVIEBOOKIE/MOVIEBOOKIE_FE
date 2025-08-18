"use client";

import { useState } from "react";
import { Card, FixedLayout } from "@/components";
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
    <FixedLayout
      title={label}
      showBackButton
      isHeader
      showBottomButton={false}
      state="detail"
    >
      <div className="mt-6 flex min-h-[calc(100vh-120px)] flex-1 flex-col">
        <div className="flex-1">
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
          <div className="px-4">
            <Pagination
              pageCount={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </FixedLayout>
  );
}
