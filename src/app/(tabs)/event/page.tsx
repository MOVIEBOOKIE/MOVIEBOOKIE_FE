"use client";

import { useState } from "react";
import RecruitmentTab from "./_components/recruitment-tab";
import ParticipationTab from "./_components/participation-tab";
import TicketTab from "./_components/ticket-tab";

export default function EventPage() {
  const [topTab, setTopTab] = useState<"모집" | "참여" | "티켓">("모집");

  return (
    <div className="min-h-screen px-5 pb-24 text-white">
      <nav className="title-1-semibold flex gap-5 pt-16.75 pb-3 text-start">
        {(["모집", "참여", "티켓"] as const).map((tab) => (
          <span
            key={tab}
            onClick={() => setTopTab(tab)}
            className={`${topTab === tab ? "text-gray-100" : "text-gray-800"}`}
          >
            {tab}
          </span>
        ))}
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

      {topTab === "모집" && <RecruitmentTab />}
      {topTab === "참여" && <ParticipationTab />}
      {topTab === "티켓" && <TicketTab />}
    </div>
  );
}
