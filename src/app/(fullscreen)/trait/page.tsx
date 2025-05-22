"use client";

import { useState } from "react";
import Step0 from "./_components/step0";
import Step1 from "./_components/step1";
import Step2 from "./_components/step2";
import Step3 from "./_components/step3";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FixedLayout } from "@/components";
import { usePostUserType } from "app/_hooks/use-user-type";

export default function Trait() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const methods = useForm({
    defaultValues: { mood: "", criterion: "", content: "" },
  });
  // const user = useUserStore((state) => state.user);
  // const userName = user?.nickname ?? "회원";
  //TODO: 렌더링 문제 해결(유저 네임 깜빡임 문제)

  const { mutate } = usePostUserType();
  const handleClick = () => {
    setStep((prev) => prev + 1);
    window.scrollTo(0, 0);
  };

  const handleClickBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
      window.scrollTo(0, 0);
    } else {
      router.back();
    }
  };

  const onSubmit = methods.handleSubmit((data) => {
    mutate({
      step1Question: data.mood,
      step2Question: data.criterion,
      favoriteCategory: data.content,
    });
  });

  const mood = methods.watch("mood");
  const criterion = methods.watch("criterion");
  const content = methods.watch("content");

  const isButtonDisabled =
    (step === 1 && !mood) ||
    (step === 2 && !criterion) ||
    (step === 3 && !content);

  const isLastStep = step === 3;
  const buttonText = isLastStep ? "제출하기" : "다음";
  const nickname = "서현";

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="relative flex flex-col">
        <FixedLayout
          title="회원가입"
          buttonText={buttonText}
          isButtonDisabled={isButtonDisabled}
          onButtonClick={() => {
            if (isLastStep) {
              onSubmit();
            } else {
              handleClick();
            }
          }}
          showBackButton
          onBackClick={handleClickBack}
        >
          <div className="mb-28 w-full flex-grow overflow-y-auto">
            {/* {step === 0 && <Step0 nickname={userName} />}
            {step === 1 && <Step1 nickname={userName} />}
            {step === 2 && <Step2 />}
            {step === 3 && <Step3 nickname={userName} />} */}
          </div>
        </FixedLayout>
      </form>
    </FormProvider>
  );
}
