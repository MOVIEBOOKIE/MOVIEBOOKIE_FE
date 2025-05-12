"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Button } from "@/components";
import { KakaoIcon } from "@/icons/index";
import { slides } from "app/data/login-slides";
import { useRouter } from "next/navigation";

export default function SlidingScreensWithLogin() {
  const router = useRouter();

  return (
    <div className="bg-gray-black relative overflow-y-auto text-white">
      <Swiper
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
          type: "bullets",
        }}
        preventClicks={false} // 클릭 방지 해제
        preventClicksPropagation={false} // 클릭 전파 방지 해제
        className="relative h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="flex flex-col items-center justify-between px-5"
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
            <div className="h-96 overflow-hidden rounded-2xl">
              {/* 임시이미지 */}
              <img
                src={slide.imageSrc}
                alt="Slide Image"
                className="h-full w-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="custom-pagination absolute bottom-40 left-1/2 z-20 -translate-x-1/2 transform" />

      <div className="bg-gray-black fixed bottom-0 z-10 w-full max-w-125 px-5 pt-5 pb-19">
        <Button
          className="text-gray-850 body-3-semibold relative flex h-12 w-full items-center justify-center bg-[#FEDC00]"
          onClick={() => {
            console.log("카카오 로그인 버튼 클릭됨");
            router.push("/login/kakao");
          }}
        >
          <KakaoIcon className="absolute left-4 h-6 w-6" />
          카카오로 로그인
        </Button>
      </div>
    </div>
  );
}
