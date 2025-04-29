"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const MOVIE_SLIDES = [
  { id: 1, title: "태풍이 지나가고", bgColor: "bg-emerald-800" },
  { id: 2, title: "블루 자켓", bgColor: "bg-blue-800" },
  { id: 3, title: "마지막 여행", bgColor: "bg-purple-800" },
  { id: 4, title: "달빛 아래", bgColor: "bg-indigo-800" },
  { id: 5, title: "어둠의 경계", bgColor: "bg-gray-800" },
];

export default function MovieSwiper() {
  const swiperRef = useRef<SwiperCore | null>(null);
  const [isReady, setIsReady] = useState(false);

  const applySlideEffect = () => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    swiper.slides.forEach((slideEl) => {
      const progress = (slideEl as any).progress ?? 0;
      slideEl.style.width = "282px";

      const isActive = Math.abs(progress) < 0.5;
      slideEl.style.height = isActive ? "404px" : "320px";
      slideEl.style.opacity = isActive ? "1" : "0.6";
    });
  };

  useEffect(() => {
    setTimeout(() => {
      applySlideEffect();
      setIsReady(true);
    }, 0);
  }, []);

  return (
    <div
      className={`relative transition-opacity duration-300 ${
        isReady ? "opacity-100" : "opacity-0"
      }`}
    >
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={14}
        slidesPerView="auto"
        centeredSlides
        loop
        watchSlidesProgress
        onProgress={applySlideEffect}
      >
        {MOVIE_SLIDES.map((movie) => (
          <SwiperSlide
            key={movie.id}
            className="flex items-center transition-transform duration-300 ease-in-out"
          >
            <div className="relative flex h-full w-full items-center justify-center">
              <div
                className={`h-full w-full rounded-xl ${movie.bgColor} flex items-center justify-center`}
              >
                {movie.title}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
