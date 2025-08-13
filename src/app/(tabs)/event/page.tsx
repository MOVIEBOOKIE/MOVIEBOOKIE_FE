"use client";

import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { PATHS } from "@/constants/index";
import { PlusIcon } from "lucide-react";
import { Suspense } from "react";

const TAB_TYPES = {
  APPLY: "신청 목록",
  HOST: "주최 목록",
} as const;

const EventBannerSection = dynamic(
  () => import("./_components/event-banner-section"),
  {
    ssr: false,
    loading: () => null,
  },
);
const EventTab = dynamic(() => import("./_components/event-tabs"));

export default function EventPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabParam = searchParams.get("tab") ?? "apply";

  return (
    <div className="scrollbar-hide relative h-[calc(100vh-102px)] overflow-y-scroll pb-25.5 text-white">
      <h1 className="title-1-semibold px-5 pt-6 pb-5">이벤트</h1>
      <Suspense fallback={null}>
        <EventBannerSection />
      </Suspense>

      <nav className="body-2-medium flex px-5 pt-6">
        {[
          { label: "신청 목록", value: "apply" },
          { label: "주최 목록", value: "host" },
        ].map((tab) => (
          <button
            type="button"
            key={tab.value}
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set("tab", tab.value);
              params.set("toggle", "0");
              router.replace(`?${params.toString()}`);
            }}
            className={`relative flex-1 pb-2 text-center transition-colors ${
              tabParam === tab.value ? "text-white" : "text-gray-500"
            }`}
          >
            {tab.label}
            {tabParam === tab.value && (
              <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-white" />
            )}
          </button>
        ))}
      </nav>
      <div className="mx-5 border-b border-gray-950" />

      <div className="px-5">
        <EventTab
          type={tabParam === "apply" ? TAB_TYPES.APPLY : TAB_TYPES.HOST}
        />
      </div>

      <div className="pointer-events-none fixed inset-0 z-50">
        <div className="pointer-events-none relative mx-auto h-full max-w-md">
          <button
            type="button"
            onClick={() => router.push(PATHS.EVENT_CREATE)}
            className="bg-red-main body-3-semibold pointer-events-auto absolute right-5 bottom-[calc(102px+24px)] flex items-center gap-1.5 rounded-full px-4 py-4 text-white focus:bg-red-700"
          >
            <PlusIcon size={18} />
            이벤트 만들기
          </button>
        </div>
      </div>
    </div>
  );
}
