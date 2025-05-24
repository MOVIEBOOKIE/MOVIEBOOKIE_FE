"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { slides } from "@/constants/login-slides";

interface Props {
  activeIndex: number;
  onChange: (index: number) => void;
}

export default function LoginSwiper({ activeIndex, onChange }: Props) {
  return (
    <Swiper
      onSlideChange={(swiper) => onChange(swiper.activeIndex)}
      className="h-full"
    >
      {slides.map((slide, index) => (
        <SwiperSlide
          key={index}
          className="flex flex-col items-center justify-between px-5 pb-24"
        >
          <div className="mt-24 text-center" style={{ whiteSpace: "pre-line" }}>
            <h2 className="title-1-bold mb-2">{slide.title}</h2>
            <p className="body-3-medium mt-3 mb-11 text-gray-400">
              {slide.description}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
