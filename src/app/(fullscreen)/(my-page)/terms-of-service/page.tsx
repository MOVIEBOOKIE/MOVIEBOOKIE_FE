import { FixedLayout } from "@/components";
import { TERMS_OF_SERVICE_SECTIONS } from "@/constants/mypage/terms";

export default function TermOfServiceContent() {
  return (
    <FixedLayout
      title="서비스 이용약관"
      showBackButton
      isHeader
      showBottomButton={false}
      state="default"
    >
      <div className="text-gray-200">
        {TERMS_OF_SERVICE_SECTIONS.map((section, idx) => (
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
