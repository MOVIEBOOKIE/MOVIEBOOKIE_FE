"use client";

import { useCallback, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { Badge } from "@/components";
import EmptyCarousel from "./empty-carousel";
import { useHomeEvents } from "app/_hooks/events/use-home-events";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constants";

export default function Carousel() {
  const swiperRef = useRef<SwiperCore | null>(null);
  const [isReady, setIsReady] = useState(false);
  const { data: events } = useHomeEvents();
  const router = useRouter();

  const applySlideEffect = () => {
    const swiper = swiperRef.current;
    if (!swiper?.slides?.length) return;

    swiper.slides.forEach((slideEl, index) => {
      const progress = (swiper.slides[index] as any).progress ?? 0;
      const scale = Math.abs(progress) < 0.5 ? 1 : 0.8;
      const opacity = Math.abs(progress) < 0.5 ? 1 : 0.7;

      slideEl.style.transform = `scale(${scale})`;
      slideEl.style.opacity = `${opacity}`;
    });
  };

  const slideRef = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      applySlideEffect();
      setIsReady(true);
    }
  }, []);

  return (
    <div
      ref={slideRef}
      className={`relative transition-opacity duration-300 ${
        isReady ? "opacity-100" : "opacity-0"
      }`}
    >
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={-10}
        slidesPerView="auto"
        centeredSlides
        loop
        watchSlidesProgress
        onProgress={applySlideEffect}
      >
        {Array.isArray(events) && events.length > 0 ? (
          events.map((event) => (
            <SwiperSlide
              style={{ width: "282px", height: "404px" }}
              key={event.eventId}
              className="flex items-center transition-transform duration-300 ease-in-out"
              onClick={() => router.push(PATHS.EVENT_DETAIL(event.eventId))}
            >
              <div className="relative flex h-full w-full items-center justify-center rounded-[12px]">
                <div className="relative h-full w-full rounded-xl">
                  <Image
                    width={282}
                    height={404}
                    src={event.posterImageUrl}
                    alt={event.title}
                    className="absolute h-full w-full rounded-[12px] object-cover"
                  />
                  <Badge
                    variant="secondary"
                    className="absolute top-4 left-4 z-10"
                  >
                    {event.eventStatus}
                  </Badge>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-black/16 to-black/64" />
                  <div className="absolute bottom-0 h-42 w-full rounded-[12px]">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/50 opacity-54" />
                    <div className="absolute bottom-0 h-30 w-full bg-gradient-to-b opacity-54 backdrop-blur-[4px]" />
                  </div>
                  <div className="absolute bottom-8 left-5 flex flex-col gap-0.75">
                    <h2 className="body-3-medium text-gray-300">
                      {event.type}
                    </h2>
                    <h1 className="title-3-bold text-gray-white">
                      {event.title}
                    </h1>
                    <p className="caption-1-medium text-gray-200">
                      {event.locationName} · {event.eventDate}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <EmptyCarousel />
        )}
      </Swiper>
    </div>
  );
}
