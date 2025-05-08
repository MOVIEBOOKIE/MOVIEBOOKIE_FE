"use client";

import { useState } from "react";
import Step0 from "./_components/step0";
import { Button } from "@/components";
import Step1 from "./_components/step1";
import Step2 from "./_components/step2";
import Step3 from "./_components/step3";
import { useForm, FormProvider } from "react-hook-form";

export default function Trait() {
  const [step, setStep] = useState(0);
  const methods = useForm({
    defaultValues: { mood: "", criterion: "", content: "" },
  });
  const { formState } = methods;

  const handleClick = () => {
    setStep((prev) => prev + 1);
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

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onSubmit}
        className="relative mx-5 flex h-full flex-col items-center"
      >
        {step === 0 && <Step0 />}
        {step === 1 && <Step1 nickname={nickname} />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 nickname={nickname} />}

        <Button
          type={step === 3 ? "submit" : "button"}
          className="absolute bottom-19"
          onClick={step < 3 ? handleClick : undefined}
          disabled={isButtonDisabled}
        >
          {step === 0 ? " 시작하기" : "다음"}
        </Button>
      </form>
    </FormProvider>
  );
}
