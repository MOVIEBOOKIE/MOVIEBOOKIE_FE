"use client";

import { useState } from "react";
import { Card, FixedLayout } from "@/components";
import Pagination from "@/components/pagination";
import { PATHS } from "@/constants";
import { EmptyIcon } from "@/icons/index";
import { useRouter } from "next/navigation";
import Loading from "app/loading";
import { useCategoryPageEvents } from "app/_hooks/events/use-category-events";
import CardSkeleton from "@/components/card-skeleton";

export default function CategoryPageClient({ label }: { label: string }) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();

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
      <div className="mt-6 flex flex-1 flex-col overflow-y-auto">
        {isLoading ? (
          <div className="mt-6 flex flex-1 flex-col gap-4 px-5">
            {Array.from({ length: 3 }).map((_, idx) => (
              <CardSkeleton key={idx} />
            ))}
          </div>
        ) : cards.length > 0 ? (
          cards.map((card, idx) => (
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
                <div className="my-4 h-px w-full bg-gray-950" />
              )}
            </div>
          ))
        ) : (
          <div className="mb-80 flex flex-col items-center justify-center pt-30 text-center text-gray-500">
            <EmptyIcon />
            <p className="body-3-medium mt-3.5 mb-7 text-gray-800">
              아직 모집 이벤트가 없어요 <br />
              지금 바로 나만의 이벤트를 만들어보세요
            </p>
            <button
              onClick={() => router.push(PATHS.EVENT_CREATE)}
              className="bg-red-main body-3-semibold w-75 rounded-xl px-6 py-4 text-white"
            >
              나만의 이벤트 만들러 가기
            </button>
          </div>
        )}
      </div>

      {!isLoading && cards.length > 0 && (
        <div className="w-full">
          <Pagination
            pageCount={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </FixedLayout>
  );
}
