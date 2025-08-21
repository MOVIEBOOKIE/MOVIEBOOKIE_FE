"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { PATHS, CATEGORY_LABELS } from "@/constants";
import { categoryMap } from "@/constants/category-map";
import { useUserStore } from "app/_stores/use-user-store";
import { useMyPage } from "app/_hooks/auth/use-mypage";
import { useFCMHandler } from "app/_hooks/fcm/use-fcm-handler";
import { useCategoryEvents } from "app/_hooks/events/use-category-events";
import { EmptyIcon, SwipeDownIcon } from "@/icons/index";
import { useSmallScreen } from "app/_hooks/use-small-screen";

const Button = dynamic(() => import("@/components/button"));
const Card = dynamic(() => import("@/components/main-card"));
const Input = dynamic(() => import("@/components/input"));
const Carousel = dynamic(() => import("./_components/carousel"), {
  ssr: false,
  loading: () => null,
});
const CardSkeleton = dynamic(() => import("@/components/card-skeleton"));
const LoadingPage = dynamic(() => import("../../loading"), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const category = searchParams.get("category");
  const defaultCategory =
    CATEGORY_LABELS.find((label) => categoryMap[label] === category) ?? "인기";

  const [selected, setSelected] =
    useState<(typeof CATEGORY_LABELS)[number]>(defaultCategory);

  const [fetchedCategories, setFetchedCategories] = useState<
    (typeof CATEGORY_LABELS)[number][]
  >(["인기", "최신"]);
  const isSmallScreen = useSmallScreen();
  const [isFirstScreen, setIsFirstScreen] = useState(true);

  const { requestOnceIfNeeded } = useFCMHandler();
  useMyPage();

  useEffect(() => {
    const scrollY = sessionStorage.getItem("homeScrollY");
    const fromSearch = searchParams.get("to") === "category";
    if (scrollY && fromSearch) {
      const el = containerRef.current;
      requestAnimationFrame(() => {
        el?.scrollTo({ top: Number(scrollY), behavior: "auto" });
      });
    }
  }, [searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const scrollTop = el.scrollTop;
      const screenHeight = window.innerHeight;
      setIsFirstScreen(scrollTop < screenHeight * 0.3);
      sessionStorage.setItem("homeScrollY", String(scrollTop));
    };
    const el = containerRef.current;
    el?.addEventListener("scroll", handleScroll);
    return () => el?.removeEventListener("scroll", handleScroll);
  }, []);

  const { data, isLoading } = useCategoryEvents(selected, {
    enabled: fetchedCategories.includes(selected),
  });

  const events = data?.eventList ?? [];

  const handleCategoryClick = (label: (typeof CATEGORY_LABELS)[number]) => {
    setSelected(label);
    if (!fetchedCategories.includes(label)) {
      setFetchedCategories((prev) => [...prev, label]);
    }
  };

  useEffect(() => {
    if (user?.email) {
      requestOnceIfNeeded();
    }
  }, [user?.email, requestOnceIfNeeded]);

  const handleSearch = () => {
    router.push(PATHS.SEARCH);
  };

  return (
    <div
      ref={containerRef}
      className="scrollbar-hide title-1-bold h-[calc(100dvh-102px)] snap-y snap-mandatory snap-start overflow-y-scroll scroll-smooth"
    >
      <section className="bg-gray-black relative flex h-screen snap-start flex-col overflow-x-hidden">
        <div
          className={`absolute right-0 left-0 z-10 flex flex-col items-center ${isSmallScreen ? "top-12" : "top-20"}`}
        >
          <p className="body-3-medium text-gray-300">{user?.userTypeTitle}</p>
          <h2 className="title-1-bold text-gray-white mt-0.75">
            {user?.nickname || "회원"}님을 위한 추천
          </h2>
        </div>

        <div
          className={`absolute ${isSmallScreen ? "top-[17%]" : "top-[20%]"} right-0 left-0 flex justify-center`}
        >
          <Carousel />
        </div>

        {(pathname === "/" || pathname === "/home") && (
          <motion.div
            className={`from-gray-black/0 to-gray-black pointer-events-none fixed inset-x-0 bottom-0 z-50 ${isSmallScreen ? "mb-25" : "mb-32"} flex w-full flex-col items-center gap-1.25 bg-gradient-to-b from-0% to-50% pt-14.25 pb-3`}
            initial={{ opacity: 1 }}
            animate={{
              opacity: isFirstScreen ? 1 : 0,
              display: isFirstScreen ? "flex" : "none",
            }}
            transition={{ duration: 0 }}
          >
            <p className="caption-1-medium text-gray-white opacity-25">
              더 많은 이벤트를 찾으려면 아래로 스와이프
            </p>
            <SwipeDownIcon className="h-6 w-6" />
          </motion.div>
        )}
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: isFirstScreen ? 0 : 1 }}
        transition={{ duration: 0.6 }}
        className="flex snap-start flex-col px-5 pb-[calc(102px+env(safe-area-inset-bottom)+8px)]"
      >
        <div className="z-0 flex flex-col items-center gap-1.75 pt-6.5 pb-9.75">
          <SwipeDownIcon className="h-6 w-6 rotate-180" />
          <p className="caption-1-medium text-gray-white opacity-25">
            맞춤 이벤트 추천은 위로 스와이프
          </p>
        </div>

        <Input type="BUTTON" onClick={handleSearch} />

        <div className="scrollbar-hide mt-3 -mr-4 mb-4 flex overflow-x-auto whitespace-nowrap">
          {CATEGORY_LABELS.map((label) => (
            <div key={label} className="flex items-center">
              <button
                type="button"
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
          <div className="mb-26 flex flex-col gap-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <CardSkeleton key={idx} />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="mb-80 flex flex-col items-center justify-center pt-30 text-center text-gray-500">
            <EmptyIcon />
            <p className="body-3-medium mt-3.5 mb-7 text-gray-800">
              아직 모집 이벤트가 없어요 <br />
              지금 바로 나만의 이벤트를 만들어보세요
            </p>
            <button
              type="button"
              onClick={() => router.push(PATHS.EVENT_CREATE)}
              className="bg-red-main body-3-semibold w-[242px] rounded-xl px-6 py-4 text-white"
            >
              나만의 이벤트 만들러 가기
            </button>
          </div>
        ) : (
          events.slice(0, 5).map((event) => (
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
                query={{ from: "home", category: categoryMap[selected] }}
              />
              <div className="my-4 h-0.25 w-full bg-gray-950" />
            </div>
          ))
        )}

        {events.length > 0 && events.length <= 4 && (
          <div
            className={
              {
                1: "h-105",
                2: "h-72",
                3: "h-56",
                4: "h-40",
              }[events.length]
            }
          />
        )}

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

        <div className="h-px shrink-0 snap-end" aria-hidden />
      </motion.section>
    </div>
  );
}
