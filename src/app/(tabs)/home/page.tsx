"use client";

import { EmptyIcon, SwipeDownIcon } from "@/icons/index";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Card, Input, Carousel } from "@/components";
import { PATHS, CATEGORY_LABELS } from "@/constants";
import { useUserStore } from "app/_stores/use-user-store";
import { useCategoryEvents } from "app/_hooks/events/use-category-events";
import CardSkeleton from "@/components/card-skeleton";
import { categoryMap } from "@/constants/category-map";
import { useMyPage } from "app/_hooks/auth/use-mypage";
import { useFCM } from "app/_hooks/use-fcm";
import { useNotificationStore } from "app/_stores/use-noti";

export default function Home() {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFirstScreen, setIsFirstScreen] = useState(true);
  const [selected, setSelected] =
    useState<(typeof CATEGORY_LABELS)[number]>("인기");
  const [showPermissionBanner, setShowPermissionBanner] = useState(false);
  const { requestPermissionAndToken, onForegroundMessage } = useFCM();

  useMyPage();

  //TODO: fcm handler로 분리해야함
  useEffect(() => {
    const alreadyRegistered = localStorage.getItem("fcm-registered");
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)",
    ).matches;

    // ✅ Android는 자동 요청, iOS는 클릭 유도
    if (!isIOS && alreadyRegistered !== "true") {
      console.log("📡 Android - FCM 등록");
      requestPermissionAndToken().then(() => {
        localStorage.setItem("fcm-registered", "true");
      });
    }

    // ✅ iOS: 홈화면(PWA) + 알림 권한이 아직 없음
    if (
      isIOS &&
      isStandalone &&
      Notification.permission === "default" &&
      alreadyRegistered !== "true"
    ) {
      console.log("ℹ️ iOS PWA - 알림 배너 표시");
      setShowPermissionBanner(true);
    }

    onForegroundMessage((payload) => {
      console.log("📩 알림 수신 (fcm handler):", payload);

      const { title, body } = payload.notification || {};
      const { code, eventId } = payload.data || {};

      if (!title || !body || !eventId) {
        console.warn("필수 필드 누락:", { title, body, eventId });
        return;
      }

      const parsedCode = code ? Number(code) : 99;
      const parsedEventId = Number(eventId);

      if (isNaN(parsedEventId)) {
        console.warn("eventId 파싱 실패:", { eventId });
        return;
      }

      useNotificationStore.getState().addNotification({
        title,
        body,
        code: parsedCode,
        eventId: parsedEventId,
      });

      console.log("알림 저장 완료");
    });
  }, []);

  // scroll 복원
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

  // scroll 감지
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

  const { data, isLoading } = useCategoryEvents(selected);
  const events = data?.eventList ?? [];

  const handleSearch = () => {
    router.push(PATHS.SEARCH);
  };

  const handleCategoryClick = (label: (typeof CATEGORY_LABELS)[number]) => {
    setSelected(label);
  };

  return (
    <>
      {/* 알림 권한 요청 배너 (iOS PWA 대응) */}
      {showPermissionBanner && (
        <div className="fixed right-4 bottom-4 left-4 z-50 rounded-lg bg-gray-900 px-4 py-3 text-white shadow-md">
          <p className="mb-2 text-sm">
            알림을 허용하고 이벤트 소식을 받아보세요!
          </p>
          <Button
            onClick={async () => {
              const permission = await Notification.requestPermission();
              if (permission === "granted") {
                await requestPermissionAndToken();
                localStorage.setItem("fcm-registered", "true");
                setShowPermissionBanner(false);
              } else {
                alert("알림 권한이 거부되었습니다.");
              }
            }}
          >
            알림 허용하기
          </Button>
        </div>
      )}
      <div
        ref={containerRef}
        className="scrollbar-hide title-1-bold h-[calc(100vh-102px)] snap-y snap-mandatory snap-start overflow-y-scroll scroll-smooth"
      >
        <section className="flex h-screen snap-start flex-col items-center overflow-x-hidden pt-15.75">
          <div className="mb-7 flex flex-col items-center">
            <p className="body-3-medium text-gray-300">{user?.userTypeTitle}</p>
            <h2 className="title-1-bold text-gray-white mt-0.75">
              {user?.nickname || "회원"}님을 위한 추천
            </h2>
          </div>
          <Carousel />

          <motion.div
            className="from-gray-black/0 to-gray-black pointer-events-none fixed bottom-0 z-5 mb-25.5 flex w-full flex-col items-center gap-1.25 bg-gradient-to-b from-0% to-50% pt-14.25 pb-3"
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
          ) : events.length === 0 ? (
            <div className="mb-78 flex flex-col items-center justify-center pt-30 text-center text-gray-500">
              <EmptyIcon />
              <p className="body-3-medium mt-3.5 text-gray-800">
                아직 모집 이벤트가 없어요 <br />
                지금 바로 나만의 이벤트를 만들어보세요
              </p>
            </div>
          ) : (
            events.map((event) => (
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

          {events.length === 5 && (
            <Button
              className="mt-1 mb-5"
              variant="secondary"
              onClick={() => {
                const categorySlug = categoryMap[selected];
                router.push(`/category/${categorySlug}`);
              }}
            >
              더보기
            </Button>
          )}

          {events.length === 1 && <div className="h-105" />}
        </motion.section>
      </div>
    </>
  );
}
