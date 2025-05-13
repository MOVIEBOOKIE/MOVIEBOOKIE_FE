"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Button } from "@/components";
import { KakaoIcon } from "@/icons/index";
import { slides } from "@/constants/login-slides";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PATHS } from "@/constants";

export default function Login() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <div className="bg-gray-black relative min-h-screen text-white">
      <div className="relative">
        <Swiper onSlideChange={handleSlideChange} className="h-full">
          {slides.map((slide, index) => (
            <SwiperSlide
              key={index}
              className="flex flex-col items-center justify-between px-5 pb-24"
            >
              <div
                className="mt-24 text-center"
                style={{ whiteSpace: "pre-line" }}
              >
                <h2 className="title-1-bold mb-2">{slide.title}</h2>
                <p className="body-3-medium mt-3 mb-11 text-gray-400">
                  {slide.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="fixed bottom-46.5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-1.5 w-1.5 rounded-full ${
                index === activeIndex ? "bg-gray-100" : "bg-gray-700"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 z-30 w-full max-w-125 -translate-x-1/2 px-5 pb-19">
        <Button
          className="text-gray-850 body-3-semibold relative flex h-12 w-full items-center justify-center bg-[#FEDC00]"
          onClick={() => {
            console.log("카카오 로그인 버튼");
            router.push(PATHS.KAKAO_LOGIN);
          }}
        >
          <KakaoIcon className="absolute left-4 h-6 w-6 pt-1" />
          카카오로 로그인
        </Button>
      </div>
    </div>
  );
}
