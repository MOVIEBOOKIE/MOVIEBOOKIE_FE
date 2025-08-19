"use client";

import { useState, useEffect } from "react";
import { FixedLayout } from "@/components";
import Step1 from "./step1";
import Step2 from "./step2";
import { useRouter } from "next/navigation";
import { useEventFormStore } from "app/_stores/use-event-create-form";
import { PATHS } from "@/constants";
import { useCreateEvent } from "app/_hooks/use-create-event";
import Complete from "@/components/complete";
import { useLoading } from "app/_context/loading-context";
import Modal from "@/components/modal";
import { flushSync } from "react-dom";
import { useToastStore } from "app/_stores/use-toast-store";

export default function Client() {
  const [step, setStep] = useState(1);
  const [btnLoading, setBtnLoading] = useState(false);
  const router = useRouter();
  const { formData, resetFormData } = useEventFormStore();
  const { mutate } = useCreateEvent();
  const { setLoading } = useLoading();
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  const handleButtonClick = () => {
    if (step === 1) {
      setStep(2);
      return;
    }
    setBtnLoading(true);
    mutate(formData, {
      onSuccess: () => {
        resetFormData();
        setStep(3);
        setBtnLoading(false);
      },
      onError: (err: any) => {
        setBtnLoading(false);
        const code = err?.response?.data?.code;

        if (code === "PARTICIPATION_404") {
          <Complete
            status="fail"
            action="이벤트 생성"
            buttonText="이벤트 다시 만들기"
            onButtonClick={() => router.push(PATHS.EVENT)}
          />;
        } else {
          useToastStore
            .getState()
            .showToast("이벤트 게시에 실패했어요", "alert");
        }
      },
    });
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
    router.push(`${PATHS.EVENT}?tab=host&toggle=0`);
  };

  return (
    <>
      {step === 3 ? (
        <Complete
          status="success"
          action="이벤트 생성"
          buttonText="모집목록 확인하기"
          onButtonClick={handleComplete}
        />
      ) : (
        <FixedLayout
          step={step}
          buttonText={step === 1 ? "이벤트 미리보기" : "이벤트 게시하기"}
          showCloseButton
          onButtonClick={handleButtonClick}
          isLoading={btnLoading}
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
          confirmText="생성 취소"
          cancelText="돌아가기"
          onConfirm={handleConfirmExit}
          onCancel={handleCancelExit}
        >
          지금까지 작성한 내용은 저장되지 않아요
        </Modal>
      )}
    </>
  );
}
