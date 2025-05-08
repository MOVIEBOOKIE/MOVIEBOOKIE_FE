"use client";

import { useState } from "react";
import Step0 from "./_components/step0";
import { Button, StepHeader } from "@/components";
import Step1 from "./_components/step1";
import Step2 from "./_components/step2";
import Step3 from "./_components/step3";

export default function Trait() {
  const [step, setStep] = useState(0);
  const handleClick = () => {
    setStep(step + 1);
  };

  const nickname = "규빈";

  return (
    <div className="relative mx-5 flex h-full flex-col items-center">
      {step === 0 && <Step0 />}
      {step === 1 && <Step1 nickname={nickname} />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 nickname={nickname} />}

      <Button className="absolute bottom-19" onClick={handleClick}>
        {step === 0 ? " 시작하기" : "다음"}
      </Button>
    </div>
  );
}
