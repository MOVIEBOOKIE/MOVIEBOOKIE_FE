"use client";

import { FixedLayout } from "@/components";
import Step1 from "./step1";
import Step2 from "./step2";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEventFormStore } from "app/_stores/use-event-create-form";
import { PATHS } from "@/constants";
import { useCreateEvent } from "app/_hooks/use-create-event";
import Complete from "@/components/complete";
import { useLoading } from "app/_context/loading-context";
import Modal from "@/components/modal";
import { useToastStore } from "app/_stores/use-toast-store";
import { flushSync } from "react-dom";

export default function Client() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const { formData, resetFormData } = useEventFormStore();
  const { mutate } = useCreateEvent();
  const { setLoading, isLoading } = useLoading();
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const showToast = useToastStore((state) => state.showToast);

  const handleButtonClick = () => {
    if (step === 1) {
      setStep(2);
    } else {
      setLoading(true);
      mutate(formData, {
        onSuccess: () => {
          resetFormData();
          setStep(3);
          setLoading(false);
        },
        onError: () => {
          showToast("이벤트 게시에 실패했어요");
          setLoading(false);
        },
      });
    }
  };
  const handleCloseClick = () => {
    setShowExitConfirm(true);
  };
  const handleConfirmExit = () => {
    flushSync(() => {
      setShowExitConfirm(false);
    });
    resetFormData();
    router.push(PATHS.EVENT);
  };

  const handleCancelExit = () => {
    setShowExitConfirm(false);
  };

  const handleComplete = () => {
    router.push(`${PATHS.EVENT}?tab=mine`);
  };

  return (
    <>
      {step === 3 ? (
        <Complete
          state="이벤트 생성"
          buttonText="모집목록 확인하기"
          onButtonClick={handleComplete}
        />
      ) : (
        <FixedLayout
          step={step}
          buttonText={step === 1 ? "이벤트 미리보기" : "이벤트 게시하기"}
          showCloseButton
          onButtonClick={handleButtonClick}
          isLoading={isLoading}
          title="이벤트 미리보기"
          onClose={handleCloseClick}
          state="preview"
        >
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
        </FixedLayout>
      )}
      {showExitConfirm && (
        <Modal
          iconType="alert"
          title="이벤트 생성을 취소할까요?"
          children="지금까지 작성한 내용은 저장되지 않아요"
          confirmText="돌아가기"
          cancelText="생성 취소"
          onCancel={handleConfirmExit}
          onConfirm={handleCancelExit}
        />
      )}
    </>
  );
}
