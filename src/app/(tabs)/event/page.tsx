"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PATHS } from "@/constants/index";
import EventTab from "./_components/event-tabs";
import TicketTab from "./_components/ticket-tab";
import { PlusIcon } from "lucide-react";
import { PopcornIcon } from "@/icons/index";

export default function EventPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [topTab, setTopTab] = useState<"신청 목록" | "내 이벤트" | "내 티켓">(
    "신청 목록",
  );

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "mine") {
      setTopTab("내 이벤트");
    } else if (tabParam === "ticket") {
      setTopTab("내 티켓");
    } else {
      setTopTab("신청 목록");
    }
  }, [searchParams]);

  return (
    <div className="relative min-h-screen pb-32 text-white">
      <h1 className="title-1-semibold px-5 pt-6 pb-5">이벤트</h1>
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
            className="bg-red-main body-3-semibold mt-5 rounded-xl px-6 py-3 text-white focus:bg-red-700"
          >
            나만의 이벤트 만들러 가기
          </button>
        </div>
      </section>
      <nav className="body-2-medium px-5 pt-6">
        {(["신청 목록", "내 이벤트", "내 티켓"] as const).map((tab) => (
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
        {topTab === "신청 목록" && <EventTab type="신청 목록" />}
        {topTab === "내 이벤트" && <EventTab type="내 이벤트" />}
        {topTab === "내 티켓" && <TicketTab />}
      </div>
      <button
        onClick={() => router.push(PATHS.EVENT_CREATE)}
        className="bg-red-main body-3-semibold fixed right-6 bottom-6 z-50 mb-25 flex items-center gap-1.5 rounded-full px-4 py-4 text-white shadow-xl focus:bg-red-700"
      >
        <PlusIcon size={18} />
        이벤트 만들기
      </button>
    </div>
  );
}
