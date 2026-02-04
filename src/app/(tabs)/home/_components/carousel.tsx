"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import EmptyCarousel from "./empty-carousel";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constants";
import { HomeEvent } from "app/_types/home-slides";

type CarouselProps = {
  events: HomeEvent[];
};

export default function Carousel({ events }: CarouselProps) {
  const swiperRef = useRef<SwiperCore | null>(null);
  const router = useRouter();

  return (
    <div className={`relative transition-opacity duration-300`}>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={18}
        slidesPerView="auto"
        loop={events.length > 1}
      >
        {events.map((event) => (
          <SwiperSlide
            key={event.eventId}

            style={{ width: 308 }}
            className="flex transform-gpu flex-col items-center justify-center overflow-hidden rounded-xl transition-all duration-300 ease-in-out will-change-transform"
            onClick={() => router.push(PATHS.EVENT_DETAIL(event.eventId))}
          >
            <div className="relative h-48 w-77 overflow-hidden rounded-t-xl">
              <Image
                fill
                sizes="308px"
                src={event.posterImageUrl}
                alt={event.eventTitle}
                className="object-cover"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/20 to-black/82" />
            </div>
            <div className="flex flex-col bg-gray-950 px-4.5 py-6">
              <div className="flex items-center gap-1.5">
                <Image
                  width={21}
                  height={21}
                  src={event.hostProfile}
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
