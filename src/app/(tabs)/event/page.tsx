"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { STATUS_MAP, PATHS } from "@/constants/index";
import EventTab from "./_components/event-tabs";
import TicketTab from "./_components/ticket-tab";
import { PlusIcon } from "lucide-react";
import { PopcornIcon } from "@/icons/index";

export default function EventPage() {
  const router = useRouter();
  const [topTab, setTopTab] = useState<"모집" | "참여" | "티켓">("모집");

  return (
    <div className="relative min-h-screen pb-32 text-white">
      <h1 className="title-1-semibold px-5 pt-6 pb-7.5">이벤트</h1>
      <section className="relative mx-5 overflow-hidden rounded-3xl">
        <img
          src="/images/event-banner.png"
          alt="이벤트 배너"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="relative z-10 flex flex-col items-center px-5 py-8 text-center text-white">
          <PopcornIcon className="mb-3 h-11 w-11 rotate-[-15.59deg]" />
          <p className="title-3-semibold leading-snug">
            지금, 같이 보고 싶은 <br /> 콘텐츠가 있다면?
          </p>
          <button
            onClick={() => router.push(PATHS.EVENT_CREATE)}
            className="bg-red-main body-3-semibold mt-5 rounded-xl px-6 py-3 text-white"
          >
            나만의 이벤트 만들러 가기
          </button>
        </div>
      </section>
      <nav className="px-5 pt-6 text-base font-semibold">
        {(["모집", "참여", "티켓"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setTopTab(tab)}
            className={`relative px-3 pb-2 transition-colors ${
              topTab === tab ? "text-white" : "text-gray-700"
            }`}
          >
            {tab}
            {topTab === tab && (
              <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-white" />
            )}
          </button>
        ))}
      </nav>{" "}
      <div className="mx-5 border-b border-gray-900" />
      <div className="px-5">
        {topTab === "모집" && (
          <EventTab type="모집" statusMap={STATUS_MAP.RECRUITMENT} />
        )}
        {topTab === "참여" && (
          <EventTab type="참여" statusMap={STATUS_MAP.PARTICIPATION} />
        )}
        {topTab === "티켓" && <TicketTab />}
      </div>
      <button
        onClick={() => router.push(PATHS.EVENT_CREATE)}
        className="bg-red-main body-3-semibold fixed right-6 bottom-6 z-50 mb-25 flex items-center gap-2 rounded-full px-4 py-4 text-white shadow-xl"
      >
        <PlusIcon size={18} />
        이벤트 만들기
      </button>
    </div>
  );
}
