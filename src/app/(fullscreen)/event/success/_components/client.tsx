"use client";

import { FixedLayout } from "@/components";
import Step1 from "./step1";
import { useState } from "react";
import Step2 from "./step2";
import { useRouter } from "next/navigation";

export default function Client() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  return (
    <FixedLayout
      buttonText={step === 1 ? "이벤트 미리보기" : "이벤트 게시하기"}
      showCloseButton={true}
      onButtonClick={() => {
        setStep(step + 1);
      }}
      detail={step === 2 ? true : false}
    >
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {/* {step === 3 && <Step1 />} */}
    </FixedLayout>
  );
}
