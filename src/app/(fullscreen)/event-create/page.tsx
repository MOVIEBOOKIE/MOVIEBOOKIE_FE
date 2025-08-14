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
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { MAX_PARTICIPANTS } from "@/constants/event-create";
import { useToastStore } from "app/_stores/use-toast-store";
import { apiGet } from "app/_apis/methods";
import { checkRecruitable } from "app/_apis/events/participation";

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
  const showToast = useToastStore((state) => state.showToast);

  const methods = useForm({
    defaultValues: storedForm,
  });

  const formValues = useWatch({ control: methods.control });
  const [isValidStep5, setIsValidStep5] = useState(true);
  const [isDateRecruitable, setIsDateRecruitable] = useState<boolean | null>(
    null,
  );
  useEffect(() => {
    if (step === 1) setIsDateRecruitable(null);
  }, [formValues?.eventDate, step]);
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
          Number(maxParticipants) > MAX_PARTICIPANTS)) ||
      (step === 5 && !locationId) ||
      (step === 6 &&
        (!eventTitle || !mediaTitle || !description || !thumbnail));
    const dateBlocked = step === 1 && isDateRecruitable === false;
    return baseInvalid || (step === 4 && !isValidStep5) || dateBlocked;
  })();
  const onSubmit = (data: EventFormValues) => {
    useEventFormStore.getState().setFormData(data);
    router.push(PATHS.EVENT_SUCCESS);
  };

  const onNext = async () => {
    const isValid = await methods.trigger();

    if (!isValid) return;
    if (step === 1) {
      const date = formValues?.eventDate;
      if (!date) return;

      try {
        const ok = await checkRecruitable(date);
        setIsDateRecruitable(ok);
        if (!ok) {
          showToast("해당 날짜에 이미 참여 중인 이벤트가 있어요");
          return;
        }
      } catch {
        showToast("네트워크 오류가 발생했어요. 잠시 후 다시 시도해 주세요.");
        return;
      }
    }

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
    flushSync(() => {
      setShowExitConfirm(false);
    });
    useEventFormStore.getState().resetFormData();
    router.push(PATHS.EVENT);
  };

  const handleCancelExit = () => {
    setShowExitConfirm(false);
  };

  return (
    <FormProvider {...methods}>
      <FixedLayout
        key={step}
        title="이벤트 만들기"
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
          confirmText="생성 취소"
          cancelText="돌아가기"
          onConfirm={handleConfirmExit}
          onCancel={handleCancelExit}
        >
          지금까지 작성한 내용은 저장되지 않아요
        </Modal>
      )}
    </FormProvider>
  );
}
