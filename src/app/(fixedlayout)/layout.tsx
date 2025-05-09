"use client";

import { ReactNode } from "react";
import { Button, Header } from "@/components";
import { cn } from "@/utils/cn";
import { usePathname } from "next/navigation";

interface FixedLayoutProps {
  children: ReactNode;
}

export default function FixedLayout({ children }: FixedLayoutProps) {
  const pathname = usePathname();

  // 페이지별 버튼 및 헤더 설정
  const config: Record<
    string,
    { label: string; disabled: boolean; title: string }
  > = {
    "/profile": { label: "확인했어요", disabled: false, title: "프로필 설정" },
    "/user-verify": { label: "다음", disabled: true, title: "회원가입" },
  };

  const currentConfig = config[pathname] || {
    label: "다음",
    disabled: true,
    title: "회원가입",
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-black text-white">
      {/* 상단 헤더 */}
      <div className="fixed top-0 left-0 z-50 w-full bg-black px-5 py-4">
        <Header title={currentConfig.title} />
      </div>

      {/* 콘텐츠 영역 */}
      <div className="mt-16 mb-24 flex-grow overflow-y-auto px-5">
        {children}
      </div>

      {/* 하단 버튼 */}
      <div className="fixed bottom-0 left-0 z-50 w-full bg-black px-5 pb-5">
        <Button
          disabled={currentConfig.disabled}
          className={cn(
            currentConfig.disabled
              ? "bg-gray-900 text-gray-700"
              : "bg-red-main text-white",
          )}
        >
          {currentConfig.label}
        </Button>
      </div>
    </div>
  );
}
