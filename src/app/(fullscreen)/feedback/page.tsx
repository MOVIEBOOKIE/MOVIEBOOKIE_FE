"use client";

import { useRouter } from "next/navigation";
import { FixedLayout } from "@/components";
import { KissingFaceIcon, ThinkingFaceIcon } from "@/icons/index";
import { PATHS } from "@/constants";

export default function FeedbackStartPage() {
  const router = useRouter();

  const handleFeedback = (type: "bad" | "good") => {
    router.push(PATHS.FEEDBACK_RESULT_WITH_TYPE(type));
  };

  return (
    <FixedLayout
      title="평가 및 피드백"
      showBackButton
      isHeader
      showBottomButton={false}
      state="default"
    >
      <div className="mt-33.5 flex flex-col items-center justify-start gap-13 text-center">
        <div>
          <div className="title-1-semibold mb-2 text-white">
            무비부키와 함께한 시간, <br /> 만족스러우셨나요?
          </div>
          <div className="caption-1-medium text-gray-500">
            작은 의견도 저희에겐 큰 도움이 돼요
          </div>
        </div>
        <div className="flex gap-5">
          <button
            onClick={() => handleFeedback("bad")}
            className="flex flex-col items-center justify-center rounded-xl border border-gray-900 bg-transparent px-14 py-8 text-gray-100"
          >
            <div className="mb-2 text-3xl">
              <ThinkingFaceIcon />
            </div>
            <div className="body-3-regular whitespace-nowrap">아쉬워요</div>
          </button>
          <button
            onClick={() => handleFeedback("good")}
            className="flex flex-col items-center justify-center rounded-xl border border-gray-900 bg-transparent px-14 py-8 text-gray-100"
          >
            <div className="mb-2 text-3xl">
              <KissingFaceIcon />
            </div>
            <div className="body-3-regular whitespace-nowrap">만족해요</div>
          </button>
        </div>
      </div>
    </FixedLayout>
  );
}
