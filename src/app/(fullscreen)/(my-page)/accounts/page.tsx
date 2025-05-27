"use client";

import { FixedLayout } from "@/components";
import NotificationTestButton from "@/components/fcm/noti-test";

export default function PrivacyPolicy() {
  return (
    <FixedLayout
      title="연결된 소셜 계정"
      showBackButton={true}
      isHeader
      showCloseButton={false}
      showBottomButton={false}
      state="default"
    >
      <NotificationTestButton />
      <div className="text-gray-200">//TODO: 연결된 소셜 계정 추가</div>
    </FixedLayout>
  );
}
