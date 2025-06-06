"use client";

import { StepHeader, TypeList } from "@/components";
import { CRITERION } from "@/constants/trait";
import { useFormContext, Controller } from "react-hook-form";

export default function Step2() {
  const { control } = useFormContext();

  return (
    <>
      <StepHeader
        StepHeader="2/3"
        title={
          <>
            콘텐츠를 시청할 때, <br />
            어떤 기준으로 고르시나요?
          </>
        }
        description="나에게 딱 맞는 기준, 하나만 골라주세요!"
      />
      <Controller
        control={control}
        name="criterion"
        render={({ field: { value, onChange } }) => (
          <div className="flex flex-col gap-2">
            {Object.entries(CRITERION).map(([key, { icon, text }]) => (
              <TypeList
                key={key}
                className={`px-3.75 py-4.5 ${
                  value === key ? "bg-gray-900" : ""
                }`}
                onClick={() => onChange(key)}
              >
                {icon}
                <span>{text}</span>
              </TypeList>
            ))}
          </div>
        )}
      />
    </>
  );
}
