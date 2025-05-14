// app/event-create/page.tsx
"use client";

import { useState } from "react";
import FixedLayout from "@/components/fixedlayout";
import { FormProvider, useForm } from "react-hook-form";
import Step1 from "./components/step1-category";
import Step2 from "./components/step2-date";

const steps = [
  { title: "카테고리 선택", component: Step1 },
  { title: "날짜 선택", component: Step2 },
];

export default function EventCreatePage() {
  const [step, setStep] = useState(0);
  const methods = useForm({
    defaultValues: {
      category: "",
    },
  });

  const CurrentStep = steps[step].component;

  const onNext = async () => {
    const isValid = await methods.trigger();
    if (!isValid) return;

    if (step < steps.length - 1) {
      setStep((s) => s + 1);
    } else {
      methods.handleSubmit((data) => {
        console.log("✅ 최종 제출:", data);
        // await fetch("/api/event", { method: "POST", body: JSON.stringify(data) });
      })();
    }
  };

  return (
    <FormProvider {...methods}>
      <FixedLayout
        title="이벤트 생성"
        onButtonClick={onNext}
        isButtonDisabled={false}
      >
        <CurrentStep />
      </FixedLayout>
    </FormProvider>
  );
}
