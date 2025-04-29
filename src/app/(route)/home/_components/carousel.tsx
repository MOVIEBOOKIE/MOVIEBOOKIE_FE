"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";

export default function MovieSwiper() {
  const swiperRef = useRef<SwiperCore | null>(null);
  const [isReady, setIsReady] = useState(false);
  const movies = [
    { id: 1, title: "태풍이 지나가고", bgColor: "bg-emerald-800" },
    { id: 2, title: "블루 자켓", bgColor: "bg-blue-800" },
    { id: 3, title: "마지막 여행", bgColor: "bg-purple-800" },
    { id: 4, title: "달빛 아래", bgColor: "bg-indigo-800" },
    { id: 5, title: "어둠의 경계", bgColor: "bg-gray-800" },
  ];

  const applySlideEffect = () => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    swiper.slides.forEach((slideEl, index) => {
      const progress = (swiper.slides[index] as any).progress ?? 0;
      if (Math.abs(progress) < 0.5) {
        slideEl.style.width = "282px";
        slideEl.style.height = "404px";
        slideEl.style.opacity = "1";
      } else {
        slideEl.style.width = "236px";
        slideEl.style.height = "320px";
        slideEl.style.opacity = "0.6";
      }
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      applySlideEffect();
      setIsReady(true);
    }, 0);

    return () => clearTimeout(timer);
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
        centeredSlides={true}
        loop={true}
        watchSlidesProgress
        onProgress={applySlideEffect}
      >
        {movies.map((movie) => (
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
