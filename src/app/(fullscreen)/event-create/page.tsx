"use client";

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
import { useEventFormStore } from "app/_stores/use-event-create-form";
import Modal from "@/components/modal";
import { useState } from "react";

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
  const router = useRouter();
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const storedForm = useEventFormStore((state) => state.formData);
  const step = useEventFormStore((state) => state.step);
  const setStep = useEventFormStore((state) => state.setStep);

  const methods = useForm({
    defaultValues: storedForm,
  });

  const formValues = useWatch({ control: methods.control });
  const [isValidStep5, setIsValidStep5] = useState(true);
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

    const baseInvalid =
      (step === 0 && !mediaType) ||
      (step === 1 && !eventDate) ||
      (step === 2 && (!eventStartTime || !eventProgressTime)) ||
      (step === 3 && !recruitmentEnd) ||
      (step === 4 &&
        (!minParticipants ||
          Number(minParticipants) <= 0 ||
          !maxParticipants ||
          Number(maxParticipants) > 320)) ||
      (step === 5 && !locationId) ||
      (step === 6 &&
        (!eventTitle || !mediaTitle || !description || !thumbnail));

    return baseInvalid || (step === 4 && !isValidStep5);
  })();

  const onSubmit = (data: EventFormValues) => {
    useEventFormStore.getState().setFormData(data);
    router.push(PATHS.EVENT_SUCCESS);
  };

  const onNext = async () => {
    const isValid = await methods.trigger();

    if (!isValid) return;

    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      methods.handleSubmit(onSubmit)();
    }
  };

  const onBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };

  const CurrentStep = steps[step].component;

  const handleCloseClick = () => {
    setShowExitConfirm(true);
  };

  const handleConfirmExit = () => {
    setShowExitConfirm(false);
    useEventFormStore.getState().resetFormData();
    router.push(PATHS.HOME);
  };

  const handleCancelExit = () => {
    setShowExitConfirm(false);
  };

  return (
    <FormProvider {...methods}>
      <FixedLayout
        key={step}
        title="이벤트 생성"
        onButtonClick={onNext}
        isButtonDisabled={isButtonDisabled}
        showCloseButton={true}
        onBackClick={onBack}
        onClose={handleCloseClick}
      >
        <CurrentStep
          onValidityChange={step === 4 ? setIsValidStep5 : undefined}
        />
      </FixedLayout>
      {showExitConfirm && (
        <Modal
          iconType="alert"
          title="이벤트 생성을 취소할까요?"
          children="지금까지 작성한 내용은 저장되지 않아요"
          confirmText="생성 취소하기"
          cancelText="아니오"
          onConfirm={handleConfirmExit}
          onCancel={handleCancelExit}
        />
      )}
    </FormProvider>
  );
}
