"use client";

import { useFormContext } from "react-hook-form";
import { StepHeader } from "@/components";
import clsx from "clsx";

const PROGRESS_TIME = ["2시간", "3시간", "4시간", "5시간"];
const START_TIME = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];

export default function Step3() {
  const { watch, setValue } = useFormContext();

  const selectedStartTime = watch("eventStartTime");
  const selectedProgress = watch("eventProgressTime");
  return (
    <>
      <StepHeader
        StepHeader="3/7"
        title={
          <>
            이벤트를 진행할 <br />
            시간을 선택해 주세요
          </>
        }
        description={<>이벤트를 진행할 시간과 시작 시간을 선택해 주세요</>}
      />

      <div className="text-body-3-medium mt-8 mb-5 text-gray-300">
        이벤트 진행 시간
      </div>
      <div className="grid grid-cols-4 gap-2">
        {PROGRESS_TIME.map((label) => (
          <button
            key={label}
            onClick={() => setValue("eventProgressTime", label)}
            className={clsx(
              "px-5.8 rounded-xl border py-3.5 text-center text-gray-200",
              selectedProgress === label
                ? "border-red-main bg-red-main text-white"
                : "border-gray-900",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="text-body-3-medium mt-9 mb-5 text-gray-300">
        이벤트 시작 시간
      </div>
      <div className="grid grid-cols-4 gap-2">
        {START_TIME.map((time) => (
          <button
            key={time}
            onClick={() => setValue("eventStartTime", time)}
            className={clsx(
              "px-5.8 rounded-xl border py-3.5 text-center text-gray-200",
              selectedStartTime === time
                ? "border-red-main bg-red-main text-white"
                : "border-gray-900",
            )}
          >
            {time}
          </button>
        ))}
      </div>
    </>
  );
}
