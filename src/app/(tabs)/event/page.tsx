"use client";

import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { PATHS } from "@/constants/index";
import { PlusIcon } from "lucide-react";
import { PopcornIcon } from "@/icons/index";
import Image from "next/image";

const EventTab = dynamic(() => import("./_components/event-tabs"));
const TicketTab = dynamic(() => import("./_components/ticket-tab"));

export default function EventPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabParam = searchParams.get("tab") ?? "apply";

  return (
    <div className="scrollbar-hide relative h-[calc(100vh-102px)] overflow-y-scroll pb-25.5 text-white">
      <h1 className="title-1-semibold px-5 pt-6 pb-5">이벤트</h1>
      <section className="relative mx-5 overflow-hidden rounded-3xl">
        <Image
          src="/images/event-banner.webp"
          alt="이벤트 배너"
          fill
          priority
          className="object-cover"
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
        {[
          { label: "신청 목록", value: "apply" },
          { label: "내 이벤트", value: "mine" },
          { label: "내 티켓", value: "ticket" },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set("tab", tab.value);
              params.delete("toggle");
              router.replace(`?${params.toString()}`);
            }}
            className={`relative px-3 pb-2 transition-colors ${
              tabParam === tab.value ? "text-white" : "text-gray-700"
            }`}
          >
            {tab.label}
            {tabParam === tab.value && (
              <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-white" />
            )}
          </button>
        ))}
      </nav>

      <div className="mx-5 border-b border-gray-900" />

      <div className="px-5">
        {tabParam === "apply" && <EventTab type="신청 목록" />}
        {tabParam === "mine" && <EventTab type="내 이벤트" />}
        {tabParam === "ticket" && <TicketTab />}
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
