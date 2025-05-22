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
import Step7 from "./components/step7-writing";
import { FixedLayout } from "@/components";
import { PATHS } from "@/constants";
import { EventFormValues } from "app/_types/event";
import { useEventFormStore } from "app/_stores/useEventCreateForm";

const steps = [
  { title: "카테고리", component: Step1 },
  { title: "날짜 ", component: Step2 },
  { title: "시간", component: Step3 },
  { title: "기간", component: Step4 },
  { title: "인원", component: Step5 },
  { title: "영화관", component: Step6 },
  { title: "모집글", component: Step7 },
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
      mediaTitle: "",
      eventTitle: "",
      description: "",
      thumbnail: null,
    },
  });

  const formValues = useWatch({ control: methods.control });

  const isButtonDisabled = (() => {
    const {
      mediaType,
      eventDate,
      eventStartTime,
      eventProgressTime,
      recruitmentEnd,
      minParticipants,
      maxParticipants,
      locationId,
      eventTitle,
      mediaTitle,
      description,
      thumbnail,
    } = formValues;

    return (
      (step === 0 && !mediaType) ||
      (step === 1 && !eventDate) ||
      (step === 2 && (!eventStartTime || !eventProgressTime)) ||
      (step === 3 && !recruitmentEnd) ||
      (step === 4 && (!minParticipants || !maxParticipants)) ||
      (step === 5 && !locationId) ||
      (step === 6 && (!eventTitle || !mediaTitle || !description || !thumbnail))
    );
  })();

  const onSubmit = (data: EventFormValues) => {
    useEventFormStore.getState().setFormData(data);
    router.push(PATHS.EVENT_SUCCESS);
  };

  const onNext = async () => {
    const isValid = await methods.trigger();

    if (!isValid) return;

    if (step < steps.length - 1) {
      setStep((s) => s + 1);
    } else {
      methods.handleSubmit(onSubmit)();
    }
  };

  const onBack = () => {
    if (step > 0) {
      setStep((s) => s - 1);
    } else {
      router.back();
    }
  };
  const CurrentStep = steps[step].component;
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
