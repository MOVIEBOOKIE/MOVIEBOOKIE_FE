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

export default function Client() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const { formData, resetFormData } = useEventFormStore();
  const { mutate } = useCreateEvent();

  const handleButtonClick = () => {
    if (step === 1) {
      setStep(2);
    } else {
      mutate(formData, {
        onSuccess: () => {
          resetFormData();
          setStep(3);
        },
        onError: (error) => {
          console.error("이벤트 생성 실패", error);
        },
      });
    }
  };

  const handlComplete = () => {
    router.push(`${PATHS.EVENT}?tab=mine`);
  };
  return (
    <>
      {step === 3 ? (
        <Complete
          state="이벤트 생성"
          buttonText="모집목록 확인하기"
          onButtonClick={handlComplete}
        />
      ) : (
        <FixedLayout
          buttonText={step === 1 ? "이벤트 미리보기" : "이벤트 게시하기"}
          showCloseButton={true}
          onButtonClick={handleButtonClick}
          title="이벤트 미리보기"
          state="preview"
        >
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
        </FixedLayout>
      )}
    </>
  );
}
