"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, FixedLayout } from "@/components";
import { badReasons, goodReasons, PATHS } from "@/constants";
import { useSubmitFeedback } from "app/_hooks/auth/use-submit-feedback";
import { useToastStore } from "app/_stores/use-toast-store";
import { devError } from "@/utils/dev-logger";

export default function FeedbackPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const eventId = searchParams.get("eventId");

  const router = useRouter();
  const [feedbackType, setFeedbackType] = useState<"good" | "bad" | null>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [text, setText] = useState("");
  const { mutate: submitFeedback } = useSubmitFeedback();
  const { showToast } = useToastStore();

  useEffect(() => {
    if (type === "good" || type === "bad") {
      setFeedbackType(type);
    }
  }, [type]);

  const handleSubmit = () => {
    if (!selectedReason) return;

    submitFeedback(
      {
        isSatisfied: feedbackType === "good",
        feedback: selectedReason,
        comment: text,
        eventId: eventId ? Number(eventId) : undefined,
      },
      {
        onSuccess: () => {
          showToast("무비부키에게 소중한 의견 감사드려요!", "checkbox");
          router.push(PATHS.MYPAGE);
        },
        onError: (error) => {
          devError("제출 실패", error);
          showToast("피드백 제출에 실패했습니다. 다시 시도해주세요.", "alert");
        },
      },
    );
  };

  const reasons = feedbackType === "good" ? goodReasons : badReasons;

  return (
    <>
      <FixedLayout
        title="평가 및 피드백"
        showBackButton
        isHeader
        showBottomButton={false}
        state="default"
      >
        <div className="mt-2 text-white">
          {feedbackType && step === 1 && (
            <div className="flex flex-col">
              <div className="mb-3">
                <span className="caption-1-medium inline-block rounded-lg bg-gray-950 px-3 py-1 text-gray-200">
                  ‘{feedbackType === "good" ? "만족해요" : "아쉬워요"}’를
                  선택했어요
                </span>
              </div>
              <p className="title-2-semibold mb-8">
                무비부키의 어떤 점이 <br />
                가장{" "}
                {feedbackType === "good" ? "만족스러웠나요?" : "아쉬웠나요?"}
              </p>
              {reasons.map((r, index) => (
                <button
                  type="button"
                  key={`${index}-${r}`}
                  onClick={() => setSelectedReason(r)}
                  className={`body-3-regular mb-2 rounded-xl border px-5 py-4.5 text-left text-gray-100 transition ${
                    selectedReason === r
                      ? "border-gray-900 bg-gray-900"
                      : "border-gray-900"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          )}
          {step === 2 && feedbackType !== null && (
            <div>
              <div className="mb-3">
                <span className="caption-1-medium inline-block rounded-lg bg-gray-950 px-3 py-1 text-gray-200">
                  자유 피드백
                </span>
              </div>
              <p className="title-3-semibold mb-4">
                더 나은 무비부키를 위해, <br /> 여러분의 의견을 들려주세요!
              </p>
              <div className="relative">
                <textarea
                  className="body-3-regular h-44.5 w-full rounded-xl border border-gray-900 bg-transparent p-4 pb-8 text-gray-100 outline-none placeholder:text-gray-800"
                  placeholder="좋았던 순간이나 아쉬웠던 점에 대해 작성해주세요"
                  rows={5}
                  maxLength={150}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <div className="body-3-regular absolute right-5 bottom-5 text-gray-500">
                  {text.length}/150
                </div>
              </div>
            </div>
          )}
        </div>
      </FixedLayout>

      {feedbackType && (
        <div className="bg-gray-black fixed bottom-0 z-50 w-full max-w-125 px-5 pt-5 pb-12.5">
          <Button
            onClick={() => {
              if (step === 1) {
                setStep(2);
              } else {
                handleSubmit();
              }
            }}
            disabled={step === 1 && !selectedReason}
          >
            {step === 1 ? "다음" : "제출하기"}
          </Button>
        </div>
      )}
    </>
  );
}
