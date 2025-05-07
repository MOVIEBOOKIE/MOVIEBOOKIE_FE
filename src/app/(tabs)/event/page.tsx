"use client";

import { Card } from "@/components";
import React, { useState } from "react";

export default function EventPage() {
  const [selected, setSelected] = useState<"신청" | "확정">("신청");

  return (
    <div className="min-h-screen px-5 pb-24 text-white">
      {/* 탭 메뉴 */}
      <nav className="title-1-semibold flex gap-5 pt-16.75 pb-3 text-start">
        <span className="text-white">모집</span>
        <span className="text-gray-600">참여</span>
        <span className="text-gray-600">티켓</span>
      </nav>

      <section className="relative mt-5 overflow-hidden rounded-xl">
        <img
          src="/event-banner.png"
          alt="이벤트 배너"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="body-1-semibold relative z-50 flex h-full flex-col items-center justify-center px-4.5 pt-8.5 text-center text-white">
          <p className="body-1-semibold">같이 보고 싶은 콘텐츠가 있다면?</p>
          <p className="caption-1-medium mt-1.5 text-gray-300">
            지금 바로 이벤트를 만들어 보세요
          </p>
          <button className="px-4.2 bg-red-main body-3-semibold mt-3.5 mb-6.25 w-full rounded-xl py-3.5">
            나만의 이벤트 만들러 가기
          </button>
        </div>
      </section>

      <div className="mt-5">
        <div className="flex h-12 rounded-xl bg-gray-950 p-1">
          <button
            onClick={() => setSelected("신청")}
            className={`body-3-semibold flex-1 rounded-xl px-4 py-2 ${
              selected === "신청" ? "bg-gray-900 text-white" : "text-gray-800"
            }`}
          >
            신청 이벤트
          </button>
          <button
            onClick={() => setSelected("확정")}
            className={`body-3-semibold flex-1 rounded-xl px-4 py-2 ${
              selected === "확정" ? "bg-gray-900 text-white" : "text-gray-800"
            }`}
          >
            확정 이벤트
          </button>
        </div>
      </div>

      {/* 카드 리스트 */}
      <div className="mt-6 space-y-6">
        {" "}
        <Card
          imageUrl="/image.png"
          category="SF"
          title="인터스텔라"
          placeAndDate="메가박스 코엑스 | 2025.05.10"
          description="시간과 공간을 넘는 감동적인 여정"
          ddayBadge="D-1"
          statusBadge="예매 마감"
          progressRate="90%"
          estimatedPrice="14,000원"
        />
        <Card
          imageUrl="/image.png"
          category="SF"
          title="인터스텔라"
          placeAndDate="메가박스 코엑스 | 2025.05.10"
          description="시간과 공간을 넘는 감동적인 여정"
          ddayBadge="D-1"
          statusBadge="예매 마감"
          progressRate="90%"
          estimatedPrice="14,000원"
        />
        <Card
          imageUrl="/image.png"
          category="SF"
          title="인터스텔라"
          placeAndDate="메가박스 코엑스 | 2025.05.10"
          description="시간과 공간을 넘는 감동적인 여정"
          ddayBadge="D-1"
          statusBadge="예매 마감"
          progressRate="90%"
          estimatedPrice="14,000원"
        />
      </div>
    </div>
  );
}
