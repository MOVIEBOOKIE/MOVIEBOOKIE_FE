"use client";

import { useRouter, usePathname } from "next/navigation";
import LightEffect from "./light-effect";

import HomeIcon from "@/icons/home.svg";
import EventIcon from "@/icons/event.svg";
import MyIcon from "@/icons/my.svg";

const tabs = [
  {
    id: "home",
    label: "홈",
    path: "/",
    Icon: HomeIcon,
  },
  {
    id: "event",
    label: "이벤트",
    path: "/event",
    Icon: EventIcon,
  },
  {
    id: "mypage",
    label: "마이",
    path: "/my-page",
    Icon: MyIcon,
  },
] as const;

export default function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  function isActive(path: string) {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  }

  function handleClick(path: string) {
    router.push(path);
  }

  return (
    <nav className="bg-gray-black fixed bottom-0 left-1/2 z-50 mt-[14px] mb-[18px] flex h-[70px] w-full max-w-[500px] -translate-x-1/2 transform items-center justify-around pt-[9px] pb-[16px]">
      {tabs.map((tab) => {
        const active = isActive(tab.path);
        const IconComponent = tab.Icon;

        return (
          <button
            key={tab.id}
            onClick={() => handleClick(tab.path)}
            className="relative flex w-20 flex-col items-center gap-2"
            aria-label={tab.label}
          >
            {active && <LightEffect />}

            <div className="relative flex h-6 w-6 items-center justify-center">
              <IconComponent
                className="h-full w-full"
                stroke={active ? "#BE1531" : "#434448"}
                fill="none"
              />
            </div>

            <p
              className={`caption-3-medium ${
                active ? "text-red-700" : "text-gray-800"
              }`}
            >
              {tab.label}
            </p>
          </button>
        );
      })}
    </nav>
  );
}
