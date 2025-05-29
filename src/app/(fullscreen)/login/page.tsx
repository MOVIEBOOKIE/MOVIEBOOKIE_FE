"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Button } from "@/components";
import { KakaoIcon } from "@/icons/index";
import { slides } from "@/constants/login-slides";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PATHS } from "@/constants";
import PwaPromptModal from "@/components/pwa-prompt-modal";
import Image from "next/image";

export default function Login() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <>
      <PwaPromptModal />
      <div className="bg-gray-black relative min-h-screen text-white">
        <div className="relative">
          <Swiper onSlideChange={handleSlideChange} className="h-full">
            {slides.map((slide, index) => (
              <SwiperSlide
                key={index}
                className="flex flex-col items-center justify-between pb-11"
              >
                <div className="flex w-full flex-1 flex-col items-center justify-center">
                  <div
                    className="px-4 pt-12 text-center"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    <h2 className="title-1-bold mb-2">{slide.title}</h2>
                    <p className="body-3-medium mt-2 mb-2 text-gray-400">
                      {slide.description}
                    </p>
                  </div>
                  <div className="mt-12 flex w-full items-center justify-center">
                    <div className="relative h-[333px] w-[375px]">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-contain"
                        priority={index === 0}
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="fixed bottom-46.5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {[0, 1, 2].map((_, index) => (
              <button
                key={index}
                className={`h-1.5 w-1.5 rounded-full ${
                  index === activeIndex ? "bg-gray-100" : "bg-gray-700"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="fixed bottom-0 left-1/2 z-30 w-full max-w-125 -translate-x-1/2 px-5 pb-12">
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
    </>
  );
}
