"use client";

import { FixedLayout } from "@/components";
import { PATHS } from "@/constants";
import { PRIVACY_POLICY_SECTIONS } from "@/constants/mypage/privacy";
import { useRouter } from "next/navigation";

export default function PrivacyPolicy() {
  const router = useRouter();
  return (
    <FixedLayout
      title="개인정보처리방침"
      showBackButton={false}
      isHeader
      showCloseButton={true}
      showBottomButton={false}
      onClose={() => router.push(PATHS.MYPAGE)}
      state="default"
    >
      <div className="text-gray-200">
        {PRIVACY_POLICY_SECTIONS.map((section, idx) => (
          <div key={idx} className="mb-6">
            <h2 className="body-3-semibold mb-1 text-gray-200">
              {section.title}
            </h2>
            <p className="caption-1-regular leading-relaxed whitespace-pre-wrap text-gray-400">
              {section.content}
            </p>
          </div>
        ))}
      </div>
    </FixedLayout>
  );
}
