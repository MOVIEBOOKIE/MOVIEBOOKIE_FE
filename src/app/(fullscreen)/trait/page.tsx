"use client";

import { useState } from "react";
import Step0 from "./_components/step0";
import { Button, Header } from "@/components";
import Step1 from "./_components/step1";
import Step2 from "./_components/step2";
import Step3 from "./_components/step3";
import { useForm, FormProvider } from "react-hook-form";

export default function Trait() {
  const [step, setStep] = useState(0);
  const methods = useForm({
    defaultValues: { mood: "", criterion: "", content: "" },
  });

  const handleClick = () => {
    setStep((prev) => prev + 1);
    window.scrollTo(0, 0);
  };

  const onSubmit = methods.handleSubmit((data) => {
    console.log("제출된 데이터:", data);
  });

  const mood = methods.watch("mood");
  const criterion = methods.watch("criterion");
  const content = methods.watch("content");

  const isButtonDisabled =
    (step === 1 && !mood) ||
    (step === 2 && !criterion) ||
    (step === 3 && !content);

  const nickname = "규빈";

  const handleBack = () => {
    if (step >= 1) {
      setStep(step - 1);
    }
    console.log("dk");
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onSubmit}
        className="relative mx-5 flex flex-col items-center"
      >
        <Header onBack={handleBack} className="bg-gray-black fixed w-full" />
        <div className="mt-12.5 mb-38 w-full flex-grow overflow-y-auto">
          {step === 0 && <Step0 nickname={nickname} />}
          {step === 1 && <Step1 nickname={nickname} />}
          {step === 2 && <Step2 />}
          {step === 3 && <Step3 nickname={nickname} />}
        </div>
        <div className="bg-gray-black fixed bottom-0 w-full max-w-125 px-5 pt-5 pb-19">
          <Button
            type={step === 3 ? "submit" : "button"}
            onClick={step < 3 ? handleClick : undefined}
            disabled={isButtonDisabled}
          >
            {step === 0 ? " 시작하기" : "다음"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
