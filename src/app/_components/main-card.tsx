"use client";

import React from "react";
import Image from "next/image";

export default function Card() {
  return (
    <div className="relative flex h-[120px] w-[335px] gap-[12px]">
      <div className="relative h-[120px] w-[120px] overflow-hidden rounded-[8px]">
        <Image
          src="/test.png"
          alt="영화 포스터"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <p className="caption-1-medium text-gray-500">영화</p>
          <h2 className="body-2-semibold body-2-semibold line-clamp-2text-white mb-1">
            더 폴: 오디어스와 환상의 문
          </h2>
          <p className="caption-2-medium mt-2 text-gray-500">
            신촌 아트레온 · 2025.05.26
          </p>
          <p className="caption-1-regular mt-[6px] line-clamp-2 text-gray-500">
            안녕하세요, 대관 관련 상세정보입니다 상세정보상세정보안녕하세요,
            대관 관련 상세정보
          </p>
        </div>

        <div className="caption-2-medium mt-2 flex items-center justify-between gap-[7px] text-gray-700">
          <p>
            모집 달성율 <span className="text-gray-300">60%</span>
          </p>
          <p>
            예상가격 <span className="text-gray-300">24,000원</span>
          </p>
        </div>
      </div>
    </div>
  );
}
