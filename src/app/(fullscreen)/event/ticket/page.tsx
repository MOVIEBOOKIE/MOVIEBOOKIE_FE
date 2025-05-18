"use client";

import { useState } from "react";
import { Header } from "@/components";
import Image from "next/image";
import { MOCK_IMAGES } from "@/constants/path-images";
import { LogoWhiteIcon, RotateIcon } from "@/icons/index";

export default function Ticket() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flex h-screen w-full flex-col items-center bg-[url('/images/custom-bg.png')] bg-cover bg-center">
      <Header className="bg-transparent" title="티켓" />

      <div className="flex h-full flex-col items-center justify-center gap-8.5">
        <div
          style={{ transformStyle: "preserve-3d" }}
          className={`transform-style-preserve-3d relative h-111.75 w-72.25 transition-transform duration-700 ${
            flipped ? "rotate-y-180" : ""
          }`}
        >
          <div className="card-shadow-blur absolute h-full w-full overflow-hidden rounded-[20px] bg-white/30 p-3 backface-hidden">
            <div className="relative h-66.25 w-66.25 overflow-hidden">
              <Image
                src={MOCK_IMAGES.IMAGE_1}
                fill
                alt="ticket-image"
                className="rounded-lg object-cover"
              />
            </div>
            <p className="title-3-bold mt-5 pl-0.5">빌리 엘리어트</p>
            <div className="mt-2.5 grid grid-cols-3 gap-x-6 gap-y-1.5 pl-0.5">
              <h2 className="caption-3-medium opacity-48">일시</h2>
              <p className="caption-3-medium opacity-48">장소</p>
              <p className="caption-3-medium opacity-48">예상 금액</p>
              <p className="caption-1-medium opacity-48">2025. 05. 26</p>
              <p className="caption-1-medium opacity-48">신촌 아트레온</p>
              <p className="caption-1-medium opacity-48">24,000원</p>
            </div>
            <LogoWhiteIcon
              width={30}
              height={30}
              className="absolute bottom-4 left-1/2 -translate-x-1/2"
            />
          </div>

          <div className="card-shadow-blur absolute h-full w-full rotate-y-180 overflow-hidden rounded-[20px] bg-white/30 px-3.5 pb-4 backface-hidden">
            <h2 className="title-3-bold mt-17.25">빌리 엘리어트</h2>
            <h3 className="caption-1-medium mt-0.5 text-gray-200">
              (영화) 신촌 아트레온
            </h3>
            <div className="bg-gray-white mt-2.25 h-0.25 w-full opacity-14" />

            <div className="mt-5 grid grid-cols-[auto_1fr] gap-x-4.5 gap-y-2">
              <p className="caption-1-medium text-gray-200">위치</p>
              <p className="caption-1-regular text-gray-100">
                서울특별시 어쩌구 저쩌구 무슨로
              </p>
              <p className="caption-1-medium text-gray-200">일시</p>
              <p className="caption-1-regular text-gray-100">
                2025. 05. 26 (일)
              </p>
              <p className="caption-1-medium text-gray-200">시간</p>
              <p className="caption-1-regular text-gray-100">18:00~20:24</p>
              <p className="caption-1-medium mt-3 text-gray-200">인원</p>
              <p className="caption-1-regular text-gray-100">모집인원 24명</p>
              <p className="caption-1-medium text-gray-200">가격</p>
              <p className="caption-1-regular text-gray-100">24,000원</p>
              <p className="caption-1-medium text-gray-200">주최</p>
              <p className="caption-1-regular text-gray-100">김서현</p>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="rounded-full bg-white/20"
          onClick={() => setFlipped(!flipped)}
        >
          <RotateIcon />
        </button>
      </div>
    </div>
  );
}
