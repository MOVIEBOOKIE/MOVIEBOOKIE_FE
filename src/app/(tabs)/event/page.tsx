import EventBannerSection from "./_components/event-banner-section";
import Link from "next/link";
import EventTab from "./_components/event-tabs";
import { EventCreateButton } from "@/components";

const TAB_TYPES = {
  APPLY: "신청 목록",
  HOST: "주최 목록",
} as const;

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
      <EventBannerSection />

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
              <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-white" />
            )}
          </Link>
        ))}
      </nav>
      <div className="mx-5 border-b border-gray-950" />

      <div className="px-5">
        <EventTab
          type={tabParam === "apply" ? TAB_TYPES.APPLY : TAB_TYPES.HOST}
        />
      </div>

      <EventCreateButton />
    </div>
  );
}
