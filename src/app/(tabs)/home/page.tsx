"use client";

import { EmptyIcon, SwipeDownIcon } from "@/icons/index";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button, Card, Input, Carousel } from "@/components";
import { PATHS, CATEGORY_LABELS } from "@/constants";
import { useUserStore } from "app/_stores/useUserStore";
import { useCategoryEvents } from "app/_hooks/events/use-category-events";
import CardSkeleton from "@/components/card-skeleton";

export default function Home() {
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  const [selected, setSelected] =
    useState<(typeof CATEGORY_LABELS)[number]>("인기");

  const containerRef = useRef<HTMLDivElement>(null);
  const [isFirstScreen, setIsFirstScreen] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollTop = containerRef.current.scrollTop;
      const screenHeight = window.innerHeight;
      setIsFirstScreen(scrollTop < screenHeight / 2);
    };

    const el = containerRef.current;
    if (el) el.addEventListener("scroll", handleScroll);
    return () => el?.removeEventListener("scroll", handleScroll);
  }, []);

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useCategoryEvents(selected);

  const allEvents = data?.pages.flat() ?? [];

  const handleSearch = () => {
    router.push(PATHS.SEARCH);
  };

  const handleCategoryClick = (label: (typeof CATEGORY_LABELS)[number]) => {
    setSelected(label);
  };

  return (
    <div
      ref={containerRef}
      className="scrollbar-hide h-[calc(100vh-102px)] snap-y snap-mandatory snap-start overflow-y-scroll scroll-smooth"
    >
      <section className="flex h-screen snap-start flex-col items-center overflow-x-hidden pt-15.75">
        <div className="mb-7 flex flex-col items-center">
          <p className="body-3-medium text-gray-300">못말리는 영화러버</p>
          <h2 className="title-1-bold text-gray-white mt-0.75">
            {user?.nickname || "사용자"}님을 위한 추천
          </h2>
        </div>
        <Carousel />

        <motion.div
          className="from-gray-black/0 to-gray-black fixed bottom-0 z-10 mb-25.5 flex w-full flex-col items-center gap-1 bg-gradient-to-b from-0% to-50% pt-14.25 pb-3"
          initial={{ opacity: 1 }}
          animate={{
            opacity: isFirstScreen ? 1 : 0,
            display: isFirstScreen ? "flex" : "none",
          }}
          transition={{ duration: 0 }}
        >
          <p className="caption-2-medium text-gray-white opacity-47">
            더 많은 이벤트를 찾으려면 아래로 스와이프
          </p>
          <SwipeDownIcon className="h-6 w-6" />
        </motion.div>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: isFirstScreen ? 0 : 1 }}
        transition={{ duration: 0.6 }}
        className="flex snap-start flex-col px-5"
      >
        <div className="mt-6.25 mb-4 flex flex-col items-center gap-1.25">
          <SwipeDownIcon className="h-6 w-6 rotate-180" />
          <p className="caption-2-medium text-gray-white opacity-47">
            맞춤 이벤트 추천은 위로 스와이프
          </p>
        </div>

        <Input type="BUTTON" onClick={handleSearch} />

        <div className="scrollbar-hide mt-3 -mr-4 mb-4 flex overflow-x-auto whitespace-nowrap">
          {CATEGORY_LABELS.map((label) => (
            <div key={label} className="flex items-center">
              <button
                className={`body-2-semibold rounded-full px-3.5 py-2.25 ${
                  selected === label ? "text-red-main" : "text-gray-500"
                }`}
                onClick={() => handleCategoryClick(label)}
              >
                {label}
              </button>
              {label === "최신" && (
                <div className="mx-2 h-4 w-px bg-gray-800" />
              )}
            </div>
          ))}
        </div>

        {isLoading ? (
          <div className="flex flex-col gap-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <CardSkeleton key={idx} />
            ))}
          </div>
        ) : allEvents.length === 0 ? (
          <div className="mb-78 flex flex-col items-center justify-center pt-30 text-center text-gray-500">
            <EmptyIcon />
            <p className="body-3-medium mt-3.5 text-gray-800">
              아직 모집 이벤트가 없어요 <br />
              지금 바로 나만의 이벤트를 만들어보세요
            </p>
          </div>
        ) : (
          allEvents.map((event, index) => (
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
              {index !== allEvents.length - 1 && (
                <div className="my-4 h-0.25 w-full bg-gray-950" />
              )}
            </div>
          ))
        )}

        {hasNextPage && (
          <Button
            className="mt-6 mb-8.5"
            variant="secondary"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "불러오는 중..." : "더보기"}
          </Button>
        )}
        {allEvents.length === 1 && <div className="h-105" />}
      </motion.section>
    </div>
  );
}
