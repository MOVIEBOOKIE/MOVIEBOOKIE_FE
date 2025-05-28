"use client";

import { FixedLayout } from "@/components";
import { MyKakaoIcon } from "@/icons/index";
import { useUserStore } from "app/_stores/useUserStore";

export default function PrivacyPolicy() {
  const user = useUserStore((state) => state.user);

  return (
    <FixedLayout
      title="연결된 소셜 계정"
      showBackButton={true}
      isHeader
      showCloseButton={false}
      showBottomButton={false}
      state="default"
    >
      <div>
        <div className="flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-4">
          <div className="flex h-6 w-6 items-center justify-center pb-5">
            <MyKakaoIcon />
          </div>
          <div className="flex flex-col">
            <p className="caption-1-medium mb-0.5 text-gray-500">카카오 계정</p>
            <p className="body-3-regular text-gray-200">{user?.email}</p>
          </div>
        </div>
      </div>
    </FixedLayout>
  );
}
