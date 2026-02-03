"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import EmptyCarousel from "./empty-carousel";
import { useHomeEvents } from "app/_hooks/events/use-home-events";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constants";

type CarouselProps = {
  onReady?: () => void;
  onHomeEnter?: () => void;
};

export default function Carousel({ onReady, onHomeEnter }: CarouselProps) {
  const swiperRef = useRef<SwiperCore | null>(null);
  const router = useRouter();
  const { data: events, isFetched, refetch } = useHomeEvents();

  function shuffleArray<T>(array: T[]): T[] {
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  }

  const slides = useMemo(() => {
    if (!Array.isArray(events)) return [];
    return shuffleArray(events);
  }, [events]);
  const totalImages = slides.length;

  const [loadedImages, setLoadedImages] = useState(0);
  const [ready, setReady] = useState(false);

  const handleImageLoaded = useCallback(() => {
    setLoadedImages((c) => c + 1);
  }, []);

  useEffect(() => {
    const isCarouselDataReady =
      isFetched && (totalImages === 0 || loadedImages >= totalImages);
    if (!ready && isCarouselDataReady) {
      setReady(true);
      onReady?.();
    }
  }, [ready, isFetched, totalImages, loadedImages, onReady]);

  useEffect(() => {
    if (onHomeEnter) {
      onHomeEnter();
    }
  }, [onHomeEnter, refetch]);

  if (!isFetched) return null;
  if (totalImages === 0) return <EmptyCarousel />;

  return (
    <div
      className={`relative transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}
    >
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={12}
        slidesPerView="auto"
        loop={totalImages > 1}
      >
        {slides.map((event) => (
          <SwiperSlide
            key={event.eventId}
            className="flex w-77! transform-gpu flex-col items-center justify-center overflow-hidden rounded-xl transition-all duration-300 ease-in-out will-change-transform"
            onClick={() => router.push(PATHS.EVENT_DETAIL(event.eventId))}
          >
            <div className="relative h-48 w-77 overflow-hidden rounded-t-xl">
              <Image
                fill
                sizes="308px"
                src={event.posterImageUrl}
                alt={event.eventTitle}
                className="object-cover"
                onLoadingComplete={handleImageLoaded}
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/20 to-black/82" />
            </div>
            <div className="flex flex-col bg-gray-950 px-4.5 py-6">
              <div className="flex items-center gap-1.5">
                <Image
                  width={21}
                  height={21}
                  src={event.posterImageUrl}
                  alt="주최자 프로필 이미지"
                  className="h-5.25 w-5.25 rounded-full object-cover"
                />
                <p className="caption-1-medium text-gray-200">
                  {event.hostName}
                </p>
              </div>
              <h2 className="title-3-bold text-gray-white mt-3">
                {event.eventTitle}
              </h2>
              <p className="caption-1-medium mt-2 line-clamp-4 h-16 overflow-hidden text-gray-300">
                {event.eventDescription}
              </p>
              <div className="my-6 h-px w-full bg-gray-900" />
              <p className="body-3-semibold text-gray-100">
                {event.mediaTitle}
              </p>
              <p className="caption-2-medium mt-1 text-gray-300">
                {event.locationName} · {event.eventDate}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
