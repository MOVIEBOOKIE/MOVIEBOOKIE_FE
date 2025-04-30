"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Badge from "@/app/_components/badge";

const MOVIE_SLIDES = [
  { id: 1, title: "태풍이 지나가고", image: "/image.png" },
  { id: 2, title: "블루 자켓", image: "/image.png" },
  { id: 3, title: "마지막 여행", image: "/image.png" },
  { id: 4, title: "달빛 아래", image: "/image.png" },
  { id: 5, title: "어둠의 경계", image: "/image.png" },
];

export default function MovieSwiper() {
  const swiperRef = useRef<SwiperCore | null>(null);
  const [isReady, setIsReady] = useState(false);

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
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={-10}
        slidesPerView="auto"
        centeredSlides
        loop
        watchSlidesProgress
        onProgress={applySlideEffect}
      >
        {MOVIE_SLIDES.map((movie) => (
          <SwiperSlide
            style={{ width: "282px", height: "404px" }}
            key={movie.id}
            className="flex items-center transition-transform duration-300 ease-in-out"
          >
            <div className="relative flex h-full w-full items-center justify-center">
              <div className="relative flex h-full w-full items-center justify-center rounded-xl">
                <Image
                  width={282}
                  height={404}
                  src={movie.image}
                  alt="poster"
                  className="absolute h-full w-full rounded-xl object-cover"
                />
                <Badge className="absolute top-4 left-4 z-10">모집 중</Badge>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-black/16 from-0% to-black/64 to-[81.97%]" />
                <div className="absolute bottom-0 h-42 w-full">
                  <div className="absolute inset-0 bg-gradient-to-b from-[rgba(22,22,22,0)] from-[29.9%] via-[rgba(25,25,25,0.10)] to-[rgba(29,29,29,0.50)] opacity-54" />

                  <div className="absolute bottom-0 h-30 w-full bg-gradient-to-b opacity-54 backdrop-blur-[4px]" />
                </div>

                <div className="absolute bottom-8 left-5 flex flex-col gap-0.75">
                  <h2 className="body-3-medium text-gray-300">영화</h2>
                  <h1 className="title-3-bold text-gray-white">
                    {movie.title}
                  </h1>
                  <p className="caption-1-medium text-gray-200">
                    신촌 아트레온 · 2025. 05. 26
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
