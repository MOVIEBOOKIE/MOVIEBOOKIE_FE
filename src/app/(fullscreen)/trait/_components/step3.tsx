"use client";

import { StepHeader, TypeList } from "@/components";
import { CONTENT } from "@/constants/trait";
import { useFormContext, Controller } from "react-hook-form";

interface Step3Props {
  nickname: string;
}

export default function Step3({ nickname }: Step3Props) {
  const { control } = useFormContext();

  return (
    <>
      <StepHeader
        StepHeader="3/3"
        title={
          <>
            {nickname}님이 자꾸 손이 가는 <br />
            콘텐츠는 무엇인가요?
          </>
        }
        description="나에게 딱 맞는 기준, 하나만 골라주세요!"
      />
      <Controller
        control={control}
        name="content"
        render={({ field: { value, onChange } }) => (
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(CONTENT).map(([key, { icon, text }]) => (
              <TypeList
                key={key}
                className={`w-full flex-col justify-center py-7.5 ${
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
