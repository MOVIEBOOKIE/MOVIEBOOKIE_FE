"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { Badge } from "@/components";
import EmptyCarousel from "./empty-carousel";
import { useHomeEvents } from "app/_hooks/events/use-home-events";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constants";

type CarouselProps = { onReady?: () => void };

export default function Carousel({ onReady }: CarouselProps) {
  const swiperRef = useRef<SwiperCore | null>(null);
  const router = useRouter();
  const { data: events, isFetched } = useHomeEvents();

  const slides = useMemo(() => (Array.isArray(events) ? events : []), [events]);
  const totalImages = slides.length;

  const [loadedImages, setLoadedImages] = useState(0);
  const [ready, setReady] = useState(false);

  const applySlideEffect = useCallback(() => {
    const swiper = swiperRef.current;
    if (!swiper?.slides?.length) return;
    swiper.slides.forEach((slideEl, index) => {
      const progress = (swiper.slides[index] as any).progress ?? 0;
      const scale = Math.abs(progress) < 0.5 ? 1 : 0.8;
      const opacity = Math.abs(progress) < 0.5 ? 1 : 0.7;
      (slideEl as HTMLElement).style.transform = `scale(${scale})`;
      (slideEl as HTMLElement).style.opacity = `${opacity}`;
    });
  }, []);

  const handleImageLoaded = useCallback(() => {
    setLoadedImages((c) => c + 1);
  }, []);

  useEffect(() => {
    const isCarouselDataReady =
      isFetched && (totalImages === 0 || loadedImages >= totalImages);
    if (!ready && isCarouselDataReady) {
      setReady(true);
      requestAnimationFrame(() => applySlideEffect());
      onReady?.();
    }
  }, [ready, isFetched, totalImages, loadedImages, applySlideEffect, onReady]);

  if (!isFetched) return null;
  if (totalImages === 0) return <EmptyCarousel />;

  return (
    <div
      className={`relative transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"} overflow-visible`}
    >
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={-10}
        slidesPerView="auto"
        centeredSlides
        loop={totalImages > 1}
        watchSlidesProgress
        onProgress={applySlideEffect}
        onSetTranslate={applySlideEffect}
        className="!overflow-visible"
      >
        {slides.map((event) => (
          <SwiperSlide
            key={event.eventId}
            style={{ width: "282px", height: "404px" }}
            className="flex transform-gpu items-center transition-transform duration-300 ease-in-out will-change-transform"
            onClick={() => router.push(PATHS.EVENT_DETAIL(event.eventId))}
          >
            <div className="relative h-full w-full overflow-hidden rounded-[12px]">
              <Image
                fill
                sizes="282px"
                src={event.posterImageUrl}
                alt={event.title}
                className="object-cover"
                onLoadingComplete={handleImageLoaded}
                priority
              />
              <Badge
                variant="secondary"
                className="pointer-events-none absolute top-4 left-4 z-10"
              >
                {event.eventStatus}
              </Badge>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/16 to-black/64" />
              <div className="absolute bottom-0 h-42 w-full">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/50 opacity-54" />
              </div>

              <div className="pointer-events-none absolute bottom-8 left-5 flex flex-col gap-0.75">
                <h2 className="body-3-medium text-gray-300">{event.type}</h2>
                <h1 className="title-3-bold text-gray-white">{event.title}</h1>
                <p className="caption-1-medium text-gray-200">
                  {event.locationName} · {event.eventDate}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
