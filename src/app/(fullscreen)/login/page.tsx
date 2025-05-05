"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import KakaoIcon from "@/icons/ui/kakao.svg";

const slides = [
  {
    title: "무비부키가\n당신의 취향을 저격해요",
    description:
      "좋아하는 콘텐츠와 ~를 기반으로\n내게 딱 맞는 이벤트를 추천받아요",
  },
  {
    title: "복잡했던 대관 절차,\n이제는 단 5분만에!",
    description:
      "6개의 단계를 걸치면 누구나 쉽고 빠르게\n인원 모집부터 대관까지 가능해요",
  },
  {
    title: "나만의 티켓을 발급하고\n영화관에 방문해요!",
    description:
      "상영이 확정되면, 나만의 티켓이 발급돼요\n상영 이후에도 추억을 소중히 간직할 수 있어요",
  },
];

export default function Login() {
  const [index, _] = useState(0);
  const slide = slides[index];

  return (
    <div className="bg-gray-black flex min-h-screen flex-col items-center justify-between px-5 pt-121.25 pb-19">
      <div className="flex flex-col items-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="title-1-bold whitespace-pre-line text-gray-100">
              {slide.title}
            </h1>
            <p className="body-3-medium mt-4 whitespace-pre-line text-gray-400">
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-1.25 w-1.25 rounded-full ${
                i === index ? "bg-gray-100" : "bg-gray-700"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative w-full">
        <button className="body-3-semibold text-gray-850 relative w-full rounded-[16px] bg-[#FEDC00] py-4.5 text-center">
          <span className="block text-center">카카오로 로그인</span>
          <KakaoIcon className="absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2" />
        </button>
      </div>
    </div>
  );
}
