"use client";

import { Button, Card } from "@/components";
import CardSkeleton from "@/components/card-skeleton";
import SkeletonGate from "@/components/skeleton-gate";
import { CATEGORY_LABELS } from "@/constants";
import { categoryMap } from "@/constants/category-map";
import { EmptyIcon } from "@/icons/index";
import { useCategoryEvents } from "app/_hooks/events/use-category-events";
import { useHomeUIStore } from "app/_stores/use-home-store";
import { useRouter } from "next/navigation";

export default function Discover() {
  const router = useRouter();

  const selected = useHomeUIStore((s) => s.selectedCategory);
  const fetchedCategories = useHomeUIStore((s) => s.fetchedCategories);
  const setSelected = useHomeUIStore((s) => s.setSelectedCategory);

  const { data, isLoading, isFetching } = useCategoryEvents(selected, {
    enabled: fetchedCategories.includes(selected),
  });

  const events = data?.eventList ?? [];
  const hasData = events.length > 0;

  const loadingForGate = isLoading || isFetching;

  const handleCategoryClick = (label: (typeof CATEGORY_LABELS)[number]) => {
    setSelected(label);
  };

  return (
    <section className="flex h-full flex-col overflow-x-hidden pb-[calc(env(safe-area-inset-bottom)+8px)]">
      <div className="scrollbar-hide my-5 -mr-4 flex overflow-x-auto whitespace-nowrap">
        {CATEGORY_LABELS.map((label) => (
          <div key={label} className="flex items-center">
            <button
              type="button"
              className={`body-3-medium px-2.5 py-3.5 ${
                selected === label ? "text-red-main" : "text-gray-500"
              }`}
              onClick={() => handleCategoryClick(label)}
            >
              {label}
            </button>
            {label === "최신" && <div className="mx-2 h-4 w-px bg-gray-800" />}
          </div>
        ))}
      </div>

      <SkeletonGate
        key={selected}
        loading={loadingForGate}
        hasData={hasData}
        showAfterMs={150}
        minVisibleMs={350}
        fallback={
          <div className="mb-26 flex flex-col gap-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <CardSkeleton key={idx} />
            ))}
          </div>
        }
        empty={
          <div className="flex flex-1 flex-col items-center justify-center text-center text-gray-500">
            <EmptyIcon />
            <p className="body-3-medium mt-3.5 mb-7.5 text-gray-800">
              아직 모집 이벤트가 없어요 <br />
              지금 바로 나만의 이벤트를 만들어보세요
            </p>
            <Button
              className="w-60.5 active:bg-gray-900"
              onClick={() => router.push(`/event-create`)}
            >
              나만의 이벤트 만들러 가기
            </Button>
          </div>
        }
      >
        <>
          {events.slice(0, 5).map((event) => (
            <div key={event.eventId}>
              <Card
                id={String(event.eventId)}
                imageUrl={event.posterImageUrl}
                category={event.mediaType}
                title={event.mediaTitle}
                placeAndDate={`${event.locationName} · ${event.eventDate}`}
                description={event.description}
                ddayBadge={`D-${event.d_day}`}
                statusBadge={event.eventStatus}
                progressRate={`${event.rate}%`}
                estimatedPrice={String(event.estimatedPrice)}
              />
              <div className="my-4 h-px w-full bg-gray-950" />
            </div>
          ))}

          {events.length > 5 && (
            <Button
              className="mt-5 mb-5 active:bg-gray-900"
              variant="secondary"
              onClick={() => {
                const categorySlug = categoryMap[selected];
                router.push(`/category/${categorySlug}`);
              }}
            >
              더보기
            </Button>
          )}
        </>
      </SkeletonGate>

      <div className="h-px shrink-0 snap-end" aria-hidden />
    </section>
  );
}
