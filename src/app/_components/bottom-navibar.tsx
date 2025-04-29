"use client";

import { useRouter, usePathname } from "next/navigation";
import LightEffect from "./light-effect";
import { PATHS } from "@/app/constants/paths";
import { HomeIcon, EventIcon, MyIcon } from "@/icons";

const tabs = [
  {
    id: "home",
    label: "홈",
    path: PATHS.HOME,
    Icon: HomeIcon,
  },
  {
    id: "event",
    label: "이벤트",
    path: PATHS.EVENT,
    Icon: EventIcon,
  },
  {
    id: "mypage",
    label: "마이",
    path: PATHS.MYPAGE,
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
    <nav className="bg-gray-black mt-0.875 mb-0.875 fixed bottom-0 left-1/2 z-50 flex h-17.5 w-full max-w-[500px] -translate-x-1/2 transform items-center justify-around pt-2.25 pb-4">
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
                stroke={
                  active ? "var(--color-red-main)" : "var(--color-gray-800)"
                }
                fill="none"
              />
            </div>

            <p
              className={`caption-3-medium ${
                active ? "text-red-main" : "text-gray-800"
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
