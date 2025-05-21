"use client";

import { StepHeader } from "@/components";
import Toast from "@/components/toast";
import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

export default function Step5() {
  const { setValue, control } = useFormContext();
  const min = useWatch({ control, name: "minParticipants" });
  const max = useWatch({ control, name: "maxParticipants" });
  const [minError, setMinError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [maxError, setMaxError] = useState(false);

  const handleMinChange = (e: any) => {
    const value = parseInt(e.target.value, 10);

    if (value <= 0) {
      setMinError(true);
      setShowToast(true);
    } else {
      setMinError(false);
    }

    setValue("minParticipants", e.target.value, {
      shouldValidate: true,
    });
  };

  const handleMaxChange = (e: any) => {
    const value = parseInt(e.target.value, 10);

    if (value > 320) {
      setMaxError(true);
      setShowToast(true);
    } else {
      setMaxError(false);
    }

    setValue("maxParticipants", e.target.value, {
      shouldValidate: true,
    });
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <>
      <StepHeader
        StepHeader="5/7"
        title={
          <>
            이벤트를 진행하기 위해 <br />
            인원을 설정해주세요
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
            className={`group relative flex items-center rounded-xl border ${minError ? "border-red-500" : "border-gray-900"} px-4 py-4`}
          >
            <input
              type="number"
              min={1}
              value={min}
              onChange={handleMinChange}
              placeholder="최소인원"
              className="main body-3-medium w-full bg-transparent pr-6 text-white placeholder-gray-800 outline-none"
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
            className={`group relative flex items-center rounded-xl border ${maxError ? "border-red-500" : "border-gray-900"} px-4 py-4`}
          >
            <input
              type="number"
              min={1}
              value={max}
              onChange={handleMaxChange}
              placeholder="최대인원"
              className="main body-3-medium w-full bg-transparent pr-6 text-white placeholder-gray-800 outline-none"
            />
            <span className="absolute right-4 text-sm text-white">명</span>
          </div>
        </div>
      </div>
      {showToast && (
        <div className="fixed bottom-32 left-1/2 z-50 -translate-x-1/2 transform">
          <Toast iconType="alert">
            {minError
              ? "최소 인원은 1명부터 설정 가능해요"
              : maxError
                ? "최대 인원은 320명까지 설정 가능해요"
                : ""}
          </Toast>
        </div>
      )}
    </>
  );
}
