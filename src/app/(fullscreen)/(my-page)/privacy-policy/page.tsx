import { PRIVACY_POLICY_SECTIONS } from "@/constants/mypage/privacy";
import { PATHS } from "@/constants";
import { FixedLayout } from "@/components";

export default function PrivacyPolicyPage() {
  return (
    <FixedLayout
      title="개인정보처리방침"
      showBackButton={false}
      isHeader
      showCloseButton={true}
      showBottomButton={false}
      closeRedirectPath={PATHS.MYPAGE}
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
