// "use client";

import { FixedLayout } from "@/components";
import Step1 from "./step1";
import Step2 from "./step2";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEventFormStore } from "app/_stores/useEventCreateForm";
import { PATHS } from "@/constants";
import { useCreateEvent } from "app/_hooks/use-create-event";

export default function Client() {
  const [step, setStep] = useState(1);

  return (
    <FixedLayout
      buttonText={step === 1 ? "이벤트 미리보기" : "이벤트 게시하기"}
      showCloseButton={true}
      onButtonClick={() => {
        setStep(step + 1);
      }}
      title="이벤트 미리보기"
    >
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {/* {step === 3 && <Step1 />} */}
    </FixedLayout>
  );
}
