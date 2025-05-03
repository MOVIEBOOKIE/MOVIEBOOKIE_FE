"use client";

import { useState } from "react";
import PhoneStep from "./_components/phone-step";
import EmailStep from "./_components/email-step";
import CodeStep from "./_components/code-step";
import Header from "@/components/header";
import { useRouter } from "next/navigation";

type Step = "phoneInput" | "phoneVerify" | "emailInput" | "emailVerify";

export default function SignupFlow() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("phoneVerify");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  return (
    <div className="flex min-h-screen flex-col px-5 pt-11 text-white">
      <Header
        title="회원가입"
        showBackButton
        // onBack={() => setStepIndex((i) => i - 1)}
        // showCloseButton
        // onClose={() => router.push("/")}
      />

      {step === "phoneInput" && (
        <PhoneStep
          stepText="1/3"
          onNext={(phoneValue) => {
            setPhone(phoneValue);
            setStep("phoneVerify");
          }}
        />
      )}

      {step === "phoneVerify" && (
        <CodeStep
          stepText="1/3"
          type="문자"
          target={phone}
          onComplete={() => setStep("emailInput")}
        />
      )}

      {step === "emailInput" && (
        <EmailStep
          stepText="2/3"
          onNext={(emailValue) => {
            setEmail(emailValue);
            setStep("emailVerify");
          }}
        />
      )}

      {step === "emailVerify" && (
        <CodeStep
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
