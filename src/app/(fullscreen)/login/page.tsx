"use client";

import dynamic from "next/dynamic";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Button } from "@/components";
import { KakaoIcon } from "@/icons/index";
import { slides } from "@/constants/login-slides";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PATHS } from "@/constants";
import PwaPromptModal from "@/components/pwa-prompt-modal";
import slide1Animation from "@/lotties/randing 1.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Login() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [animationData, setAnimationData] = useState<any>(slide1Animation);

  const animationCache = useRef<Record<number, any>>({ 0: slide1Animation });

  useEffect(() => {
    const loadAnimation = async (index: number) => {
      const anim = slides[index]?.animation;
      if (typeof anim === "function") {
        const mod = await anim();
        animationCache.current[index] = mod.default;
        if (index === activeIndex) setAnimationData(mod.default);
      }
    };

    if (!animationCache.current[activeIndex]) {
      loadAnimation(activeIndex);
    } else {
      setAnimationData(animationCache.current[activeIndex]);
    }

    if (slides[activeIndex + 1] && !animationCache.current[activeIndex + 1]) {
      loadAnimation(activeIndex + 1);
    }
  }, [activeIndex]);

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <div className="bg-gray-black relative min-h-screen text-white">
      <PwaPromptModal />
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

                <div className="mt-5 flex w-full items-center justify-center">
                  {index === activeIndex && animationData ? (
                    <Lottie
                      animationData={animationData}
                      loop
                      autoplay
                      style={{ height: 333 }}
                    />
                  ) : (
                    <div style={{ height: 333 }} />
                  )}
                </div>
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

      <div className="fixed bottom-0 left-1/2 z-30 w-full max-w-125 -translate-x-1/2 px-5 pb-12">
        <Button
          className="text-gray-850 body-3-semibold relative flex h-12 w-full items-center justify-center bg-[#FEDC00]"
          onClick={() => {
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
