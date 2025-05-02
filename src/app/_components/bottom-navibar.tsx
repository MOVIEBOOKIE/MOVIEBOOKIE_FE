"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { NAVIGATION_TABS } from "app/_constants";
import LightEffect from "./light-effect";
import { HomeIcon, EventIcon, MyIcon } from "@/icons/index";

const iconMap = {
  home: HomeIcon,
  event: EventIcon,
  mypage: MyIcon,
};

export default function BottomNavigation() {
  const pathname = usePathname();

  function isActive(tabPath: string) {
    return pathname === tabPath || pathname.startsWith(`${tabPath}/`);
  }

  return (
    <nav
      className="bg-gray-black mt-0.875 mb-0.875 fixed bottom-0 left-1/2 z-50 flex h-25.5 w-full max-w-125 -translate-x-1/2 transform items-center justify-around pt-2.25 pb-4"
      role="navigation"
      aria-label="Main navigation"
    >
      {NAVIGATION_TABS.map((tab) => {
        const active = isActive(tab.path);
        const Icon = iconMap[tab.id];

        return (
          <Link
            key={tab.id}
            href={tab.path}
            className="relative flex w-20 flex-col items-center gap-2"
            aria-label={tab.label}
            aria-current={active ? "page" : undefined}
          >
            {active && <LightEffect />}
            <div className="relative flex h-6 w-6 items-center justify-center">
              <Icon
                className={`h-full w-full ${active ? "text-red-main" : "text-gray-800"}`}
              />
            </div>
            <p
              className={`caption-3-medium ${active ? "text-red-main" : "text-gray-800"}`}
            >
              {tab.label}
            </p>
          </Link>
        );
      })}
    </nav>
  );
}
