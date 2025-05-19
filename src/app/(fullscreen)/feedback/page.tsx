"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, FixedLayout } from "@/components";
import { PATHS } from "@/constants";

export default function EventCompletePage() {
  const router = useRouter();
  const [isFeedbackMode, setIsFeedbackMode] = useState(false);

  const handleComplete = () => {
    setIsFeedbackMode(true);
  };

  const handleCancel = () => {
    router.push(PATHS.HOME);
  };

  const handleFeedback = (type: "bad" | "good") => {
    router.push(PATHS.FEEDBACK_RESULT_WITH_TYPE(type));
  };

  return (
    <>
      <FixedLayout
        title={isFeedbackMode ? "평가 및 피드백" : "이벤트 상영 완료"}
        showBackButton
        isHeader
        showBottomButton={false}
        state="default"
      >
        {!isFeedbackMode ? (
          <div className="mt-31 flex flex-col items-center justify-center text-center">
            <div className="relative mb-6 aspect-square w-[200px]">
              <Image
                src="/images/image.png"
                alt="이벤트 포스터"
                fill
                className="rounded-xl object-cover"
              />
            </div>
            <div className="body-2-semibold text-white">
              “더 폴: 오디언스와 환상의 문”
            </div>
            <div className="title-2-semibold mt-1 text-white">
              이벤트 상영은 잘 완료되었나요?
            </div>
          </div>
        ) : (
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
                <div className="mb-2 text-3xl">🤔</div>
                <div className="body-3-regular">아쉬워요</div>
              </button>
              <button
                onClick={() => handleFeedback("good")}
                className="flex flex-col items-center justify-center rounded-xl border border-gray-900 bg-transparent px-14 py-8 text-gray-100"
              >
                <div className="mb-2 text-3xl">😘</div>
                <div className="body-3-regular">만족해요</div>
              </button>
            </div>
          </div>
        )}
      </FixedLayout>

      {!isFeedbackMode && (
        <div className="bg-gray-black fixed bottom-0 z-50 w-full max-w-125 px-5 pt-5 pb-12.5">
          <div className="flex flex-col gap-3">
            <Button className="bg-red-main text-white" onClick={handleComplete}>
              네, 상영이 완료되었어요
            </Button>
            <Button className="bg-gray-800 text-white" onClick={handleCancel}>
              아니요, 상영이 취소되었어요
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
