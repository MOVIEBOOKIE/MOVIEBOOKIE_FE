"use client";

import { StepHeader } from "@/components";
import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

export default function Step5() {
  const { setValue, control } = useFormContext();
  const min = useWatch({ control, name: "minParticipants" });
  const max = useWatch({ control, name: "maxParticipants" });
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
          <div className="group focus-within:border-red-main relative flex items-center rounded-xl border border-gray-900 px-4 py-4">
            <input
              type="number"
              min={1}
              value={min}
              onChange={(e) =>
                setValue("minParticipants", e.target.value, {
                  shouldValidate: true,
                })
              }
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
          <div className="group focus-within:border-red-main relative flex items-center rounded-xl border border-gray-900 px-4 py-4">
            <input
              type="number"
              min={1}
              value={max}
              onChange={(e) =>
                setValue("maxParticipants", e.target.value, {
                  shouldValidate: true,
                })
              }
              placeholder="최대인원"
              className="main body-3-medium w-full bg-transparent pr-6 text-white placeholder-gray-800 outline-none"
            />
            <span className="absolute right-4 text-sm text-white">명</span>
          </div>
        </div>
      </div>
    </>
  );
}
