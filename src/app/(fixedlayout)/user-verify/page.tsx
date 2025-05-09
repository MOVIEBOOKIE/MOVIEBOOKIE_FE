"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import PhoneStep from "./components/phone";
import EmailStep from "./components/email";

enum Step {
  Phone,
  Email,
}

export default function UserVerify() {
  const [step, setStep] = useState<Step>(Step.Phone);

  const handleNext = () => {
    if (step === Step.Phone) setStep(Step.Email);
  };

  return (
    <>
      {step === Step.Phone && <PhoneStep onNext={handleNext} />}
      {step === Step.Email && (
        <EmailStep onNext={() => console.log("인증 완료")} />
      )}
    </>
  );
}
