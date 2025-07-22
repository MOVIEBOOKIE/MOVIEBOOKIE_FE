"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { NAVIGATION_TABS } from "app/_constants";
import LightEffect from "./light-effect";
import { useNotificationStore } from "app/_stores/use-noti";
import { useSmartNotiPolling } from "app/_hooks/use-smart-noti-polling";

export default function BottomNavigation() {
  const pathname = usePathname();
  const hasUnread = useNotificationStore((state) => state.hasUnread);

  useSmartNotiPolling();

  function isActive(tabPath: string) {
    return pathname === tabPath || pathname.startsWith(`${tabPath}/`);
  }

  return (
    <nav
      className="bg-gray-black fixed bottom-0 left-1/2 z-9999 flex h-25.5 w-full max-w-125 -translate-x-1/2 transform items-center justify-around px-5 pt-2.25 pb-4"
      role="navigation"
      aria-label="Main navigation"
    >
      {NAVIGATION_TABS.map((tab) => {
        const active = isActive(tab.path);
        const IconComponent = tab.Icon;

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
              <IconComponent
                className={`h-full w-full ${active ? "text-red-main" : "text-gray-800"}`}
              />
              {tab.id === "notifications" && hasUnread && (
                <span className="bg-red-main border-gray-black absolute -top-1 -right-1 h-2 w-2 rounded-full border" />
              )}
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
