"use client";

import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import LightEffect from "./light-effect";

type TabItem = {
  id: string;
  label: string;
  path: string;
  activeIcon: string;
  inactiveIcon: string;
};

const tabs: TabItem[] = [
  {
    id: "home",
    label: "홈",
    path: "/",
    activeIcon: "/icons/navigation/Home-active.svg",
    inactiveIcon: "/icons/navigation/home.svg",
  },
  {
    id: "event",
    label: "이벤트",
    path: "/event",
    activeIcon: "/icons/navigation/Event.svg",
    inactiveIcon: "/icons/navigation/Event.svg",
  },
  {
    id: "mypage",
    label: "마이",
    path: "/my-page",
    activeIcon: "/icons/navigation/My-active.svg",
    inactiveIcon: "/icons/navigation/My.svg",
  },
];

export default function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };
  const handleClick = (path: string) => router.push(path);

  return (
    <nav className="bg-gray-black fixed bottom-0 left-1/2 z-50 mt-[14px] mb-[18px] flex h-[70px] w-full max-w-[500px] -translate-x-1/2 transform items-center justify-around pt-[9px] pb-[16px]">
      {tabs.map((tab) => {
        const active = isActive(tab.path);

        return (
          <button
            key={tab.id}
            onClick={() => handleClick(tab.path)}
            className="relative flex w-20 flex-col items-center gap-2"
            aria-label={tab.label}
          >
            {active && <LightEffect />}

            <div className="relative h-6 w-6">
              <Image
                src={active ? tab.activeIcon : tab.inactiveIcon}
                alt={`${tab.label}`}
                fill
                className="object-contain"
                priority
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
