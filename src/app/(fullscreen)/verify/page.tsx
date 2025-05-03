"use client";

import { useState } from "react";
import BackIcon from "@/icons/back.svg";
import { Button } from "@/components";
import { cn } from "@/utils/cn";
import PhoneStep from "./_components/phone-step";
import EmailStep from "./_components/email-step";
import CodeStep from "./_components/code-step";

type Step = "phoneInput" | "phoneVerify" | "emailInput" | "emailVerify";

export default function SignupFlow() {
  const [step, setStep] = useState<Step>("phoneInput");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  return (
    <div className="flex min-h-screen flex-col px-5 pt-11 text-white">
      <header className="relative flex h-12 items-center justify-center">
        <button className="absolute top-2.5 left-0">
          <BackIcon className="h-full w-full" />
        </button>

        <h1 className="pt-4.25 pb-2.75 text-base font-semibold text-white">
          회원가입
        </h1>
      </header>

      {step === "phoneInput" && (
        <PhoneStep
          onNext={(phoneValue) => {
            setPhone(phoneValue);
            setStep("phoneVerify");
          }}
        />
      )}

      {step === "phoneVerify" && (
        <CodeStep
          type="phone"
          target={phone}
          onComplete={() => setStep("emailInput")}
        />
      )}

      {step === "emailInput" && (
        <EmailStep
          onNext={(emailValue) => {
            setEmail(emailValue);
            setStep("emailVerify");
          }}
        />
      )}

      {step === "emailVerify" && (
        <CodeStep
          type="email"
          target={email}
          onComplete={() => {
            // 회원가입 완료 or 다음 단계로 이동
            console.log("가입 완료!");
          }}
        />
      )}
    </div>
  );
}
