"use client";

import { useFormContext, Controller } from "react-hook-form";
import { StepHeader, TypeList } from "@/components";
import { MOOD } from "@/constants/trait";

interface Step1Props {
  nickname: string;
}

export default function Step1({ nickname }: Step1Props) {
  const { control } = useFormContext();

  return (
    <>
      {" "}
      <StepHeader
        StepHeader="1/3"
        title={
          <>
            요즘 {nickname}님의 일상은
            <br />
            어떤 느낌인가요?
          </>
        }
        description="나에게 딱 맞는 느낌, 하나만 골라주세요!"
      />
      <Controller
        control={control}
        name="mood"
        render={({ field: { value, onChange } }) => (
          <div className="flex flex-col gap-2">
            {Object.entries(MOOD).map(([key, { icon, text }]) => (
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
