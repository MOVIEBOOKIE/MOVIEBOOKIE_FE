"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import Step1 from "./components/step1-category";
import Step2 from "./components/step2-date";
import Step3 from "./components/step3-time";
import Step4 from "./components/step4-period";
import Step5 from "./components/step5-people";
import Step6 from "./components/step6-place";
import { FixedLayout } from "@/components";

const steps = [
  { title: "카테고리", component: Step1 },
  { title: "날짜 ", component: Step2 },
  { title: "시간", component: Step3 },
  { title: "기간", component: Step4 },
  { title: "인원", component: Step5 },
  { title: "영화관", component: Step6 },
];

export default function EventCreatePage() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const methods = useForm({
    defaultValues: {
      mediaType: "",
      eventDate: "",
      eventStartTime: "",
      eventProgressTime: "",
      recruitmentStart: "",
      recruitmentEnd: "",
      minParticipants: "",
      maxParticipants: "",
      locationId: null,
    },
  });

  const CurrentStep = steps[step].component;
  const mediaType = useWatch({ control: methods.control, name: "mediaType" });
  const eventDate = useWatch({ control: methods.control, name: "eventDate" });
  const eventStartTime = useWatch({
    control: methods.control,
    name: "eventStartTime",
  });
  const eventProgressTime = useWatch({
    control: methods.control,
    name: "eventProgressTime",
  });
  const recruitmentEnd = useWatch({
    control: methods.control,
    name: "recruitmentEnd",
  });
  const minParticipants = useWatch({
    control: methods.control,
    name: "minParticipants",
  });
  const maxParticipants = useWatch({
    control: methods.control,
    name: "maxParticipants",
  });
  const locationId = useWatch({ control: methods.control, name: "locationId" });

  const isButtonDisabled =
    (step === 0 && !mediaType) ||
    (step === 1 && !eventDate) ||
    (step === 2 && (!eventStartTime || !eventProgressTime)) ||
    (step === 3 && !recruitmentEnd) ||
    (step === 4 && (!minParticipants || !maxParticipants)) ||
    (step === 5 && !locationId);

  const onNext = async () => {
    const isValid = await methods.trigger();
    console.log("📦 현재 저장된 모든 폼 데이터:", methods.getValues());

    if (!isValid) return;

    if (step < steps.length - 1) {
      setStep((s) => s + 1);
    } else {
      methods.handleSubmit((data) => {
        console.log("최종 제출:", data);
      })();
    }
  };

  const onBack = () => {
    if (step > 0) {
      setStep((s) => s - 1);
    } else {
      router.back();
    }
  };

  return (
    <FormProvider {...methods}>
      <FixedLayout
        title="이벤트 생성"
        onButtonClick={onNext}
        isButtonDisabled={isButtonDisabled}
        showCloseButton={true}
        onBackClick={onBack}
      >
        <CurrentStep />
      </FixedLayout>
    </FormProvider>
  );
}
