"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { PATHS } from "@/constants";
import { useUserStore } from "app/_stores/use-user-store";
import { useMyPage } from "app/_hooks/auth/use-mypage";
import { useFCMHandler } from "app/_hooks/fcm/use-fcm-handler";
import { ev } from "@/lib/gtm";
import { SearchIcon } from "@/icons/index";
import { EventCreateButton } from "@/components";
import { HomeTab, useHomeUIStore } from "app/_stores/use-home-store";

const HOME_TABS: Array<{ key: HomeTab; label: string }> = [
  { key: "discover", label: "발견" },
  { key: "recommend", label: "추천" },
];

const Discover = dynamic(() => import("./_components/discover"));
const Recommend = dynamic(() => import("./_components/recommend"));

export default function Home() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const user = useUserStore((state) => state.user);
  const hasHydrated = useHomeUIStore((s) => s.hasHydrated);
  const activeTab = useHomeUIStore((s) => s.activeTab);
  const setActiveTab = useHomeUIStore((s) => s.setActiveTab);

  const { requestOnceIfNeeded } = useFCMHandler();
  useMyPage();

  useEffect(() => {
    if (user?.email) {
      requestOnceIfNeeded();
    }
  }, [user?.email, requestOnceIfNeeded]);

  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    ev.homeView();
  }, []);

  const handleSearch = () => {
    router.push(PATHS.SEARCH);
  };

  if (!hasHydrated) {
    return null;
  }

  return (
    <div ref={containerRef} className="h-[calc(100dvh-102px)] px-5">
      <div className="flex justify-between pt-5.75">
        <nav aria-label="홈 탭" className="flex gap-3">
          {HOME_TABS.map((tab) => {
            const isActive = tab.key === activeTab;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`title-1-semibold ${isActive ? "text-gray-100" : "text-gray-800"}`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
        <button type="button" aria-label="검색" onClick={handleSearch}>
          <SearchIcon
            aria-hidden="true"
            focusable="false"
            className="h-7 w-7"
          />
        </button>
      </div>

      <div className="h-[calc(100dvh-161px)]" hidden={activeTab !== "discover"}>
        <Discover />
      </div>
      <div
        className="h-[calc(100dvh-161px)]"
        hidden={activeTab !== "recommend"}
      >
        <Recommend />
      </div>
      <EventCreateButton />
    </div>
  );
}
