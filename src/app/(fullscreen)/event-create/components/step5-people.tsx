import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { StepHeader } from "@/components";
import Toast from "@/components/toast";

interface Step5Props {
  onValidityChange?: (isValid: boolean) => void;
}

export default function Step5({ onValidityChange }: Step5Props) {
  const { setValue, control } = useFormContext();
  const min = useWatch({ control, name: "minParticipants" });
  const max = useWatch({ control, name: "maxParticipants" });

  const [minError, setMinError] = useState(false);
  const [maxError, setMaxError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const isRangeValid =
    Number(min) > 0 && Number(max) > 0 && Number(min) < Number(max);

  const showToastWithMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const getInputBorderClass = (hasError: boolean) =>
    hasError ? "border-red-500" : "border-gray-900";

  const validateMin = (value: number) => {
    const parsedMax = Number(max);

    if (value <= 0) {
      setMinError(true);
      showToastWithMessage("최소 인원은 1명부터 설정 가능해요");
    } else if (parsedMax > 0 && value >= parsedMax) {
      setMinError(true);
      showToastWithMessage("최소인원은 최대인원보다 많을 수 없어요");
    } else {
      setMinError(false);
    }
  };

  const validateMax = (value: number) => {
    const parsedMin = Number(min);

    if (value > 320) {
      setMaxError(true);
      showToastWithMessage("최대 인원은 320명까지 설정 가능해요");
    } else if (parsedMin > 0 && value <= parsedMin) {
      setMaxError(true);
      showToastWithMessage("최대인원은 최소인원보다 적을 수 없어요");
    } else {
      setMaxError(false);
    }
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    validateMin(value);
    setValue("minParticipants", e.target.value, { shouldValidate: true });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    validateMax(value);
    setValue("maxParticipants", e.target.value, { shouldValidate: true });
  };

  useEffect(() => {
    onValidityChange?.(isRangeValid);
    if (isRangeValid) {
      setMinError(false);
      setMaxError(false);
    }
  }, [min, max, isRangeValid, onValidityChange]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <>
      <StepHeader
        StepHeader="5/7"
        title={
          <>
            참여자의 최소 인원과, <br />
            최대 인원을 설정해주세요
          </>
        }
        description={
          <>최소 1명부터 입력 가능하며 주최자는 인원 수에 포함되지 않아요</>
        }
      />
      <div className="flex items-end gap-3">
        <div className="flex-1">
          <label className="body-3-regular mb-3 block text-gray-100">
            최소인원
          </label>
          <div
            className={`group relative flex items-center rounded-xl border ${getInputBorderClass(
              minError,
            )} px-4 py-4`}
          >
            <input
              type="number"
              min={1}
              value={min}
              onChange={handleMinChange}
              placeholder="최소인원"
              className="main body-3-medium w-full bg-transparent pr-6 text-white placeholder-gray-800 outline-none placeholder:text-[14px]"
              style={{ fontSize: "16px" }}
            />
            <span className="absolute right-4 text-sm text-white">명</span>
          </div>
        </div>

        <div className="flex items-center justify-center py-4 text-gray-500">
          -
        </div>

        <div className="flex-1">
          <label className="body-3-regular mb-3 block text-gray-100">
            최대인원
          </label>
          <div
            className={`group relative flex items-center rounded-xl border ${getInputBorderClass(
              maxError,
            )} px-4 py-4`}
          >
            <input
              type="number"
              min={1}
              value={max}
              onChange={handleMaxChange}
              placeholder="최대인원"
              className="main body-3-medium w-full bg-transparent pr-6 text-white placeholder-gray-800 outline-none placeholder:text-[14px]"
              style={{ fontSize: "16px" }}
            />
            <span className="absolute right-4 text-sm text-white">명</span>
          </div>
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-32 left-1/2 z-50 -translate-x-1/2 transform">
          <Toast iconType="alert">{toastMessage}</Toast>
        </div>
      )}
    </>
  );
}
