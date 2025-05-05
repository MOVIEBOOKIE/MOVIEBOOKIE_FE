"use client";

import { useState } from "react";
import PhoneStep from "./_components/phone-step";
import EmailStep from "./_components/email-step";
import VerifyNumber from "./_components/verify-number";
import Header from "@/components/header";
import { useRouter } from "next/navigation";

enum Step {
  PhoneInput,
  PhoneVerify,
  EmailInput,
  EmailVerify,
}

export default function VerifyFlow() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(Step.PhoneInput);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  return (
    <div className="flex min-h-screen flex-col px-5 pt-11 text-white">
      <Header title="회원가입" />

      {step === Step.PhoneInput && (
        <PhoneStep
          stepText="1/3"
          onNext={(phoneValue) => {
            setPhone(phoneValue);
            setStep(Step.PhoneVerify);
          }}
        />
      )}

      {step === Step.PhoneVerify && (
        <VerifyNumber
          stepText="1/3"
          type="문자"
          target={phone}
          onComplete={() => setStep(Step.EmailInput)}
        />
      )}

      {step === Step.EmailInput && (
        <EmailStep
          stepText="2/3"
          onNext={(emailValue) => {
            setEmail(emailValue);
            setStep(Step.EmailVerify);
          }}
        />
      )}

      {step === Step.EmailVerify && (
        <VerifyNumber
          stepText="2/3"
          type="이메일"
          target={email}
          onComplete={() => {
            router.push("/set-profile");
          }}
        />
      )}
    </div>
  );
}
