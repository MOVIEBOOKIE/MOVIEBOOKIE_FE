import dynamic from "next/dynamic";
import { PATHS } from "@/constants";
import { PlusIcon } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";

const TAB_TYPES = {
  APPLY: "신청 목록",
  HOST: "주최 목록",
} as const;

const EventBannerSection = dynamic(
  () => import("./_components/event-banner-section"),
  { ssr: true, loading: () => null },
);

const EventTabsClient = dynamic(
  () => import("./_components/event-tabs-client"),
);

export default async function EventPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const params = await searchParams;
  const tabParam = params.tab ?? "apply";

  return (
    <div className="scrollbar-hide relative h-[calc(100vh-102px)] overflow-y-scroll pb-25.5 text-white">
      <h1 className="title-1-semibold px-5 pt-6 pb-5">이벤트</h1>
      <Suspense fallback={null}>
        <EventBannerSection />
      </Suspense>

      <nav className="body-2-medium flex px-5 pt-6">
        {[
          { label: TAB_TYPES.APPLY, value: "apply" },
          { label: TAB_TYPES.HOST, value: "host" },
        ].map((tab) => (
          <Link
            key={tab.value}
            href={`?tab=${tab.value}&toggle=0`}
            replace
            scroll={false}
            prefetch={false}
            className={`relative flex-1 pb-2 text-center ${
              tabParam === tab.value ? "text-white" : "text-gray-500"
            }`}
          >
            {tab.label}
            {tabParam === tab.value && (
              <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-white" />
            )}
          </Link>
        ))}
      </nav>
      <div className="mx-5 border-b border-gray-950" />

      <div className="px-5">
        <EventTabsClient
          type={tabParam === "apply" ? TAB_TYPES.APPLY : TAB_TYPES.HOST}
        />
      </div>

      <div className="pointer-events-none fixed inset-0 z-50">
        <div className="pointer-events-none relative mx-auto h-full max-w-md">
          <Link
            href={PATHS.EVENT_CREATE}
            className="bg-red-main body-3-semibold pointer-events-auto absolute right-5 bottom-[calc(102px+24px)] flex items-center gap-1.5 rounded-full px-4 py-4 text-white focus:bg-red-700"
          >
            <PlusIcon size={18} />
            이벤트 만들기
          </Link>
        </div>
      </div>
    </div>
  );
}
