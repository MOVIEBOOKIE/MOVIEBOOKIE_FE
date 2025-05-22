"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constants";
import { Button } from "@/components";
import { KakaoIcon } from "@/icons/index";
import PwaPromptModal from "@/components/pwa-prompt-modal";
import LoginSwiper from "./login-swiper";

export default function Login() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="bg-gray-black relative min-h-screen text-white">
      <PwaPromptModal />

      <div className="relative">
        <LoginSwiper activeIndex={activeIndex} onChange={setActiveIndex} />

        <div className="fixed bottom-46.5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {[...Array(3)].map((_, index) => (
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
