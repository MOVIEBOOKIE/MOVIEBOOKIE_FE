"use client";

import { useState } from "react";
import { StepHeader } from "@/components";
import { CONTENT } from "@/constants/trait";
import TypeList from "@/components/type-list";
import { EtcIcon } from "@/icons/index";
import { useFormContext } from "react-hook-form";

export const CONTENT_WITH_ETC = {
  ...CONTENT,
  ETC: {
    icon: <EtcIcon className="h-7 w-7" />,
    text: "기타",
  },
};

export default function Step1() {
  const [selected, setSelected] = useState<string | null>(null);
  const { setValue } = useFormContext();

  return (
    <>
      <StepHeader
        StepHeader="1/7"
        title={
          <>
            어떤 카테고리의 이벤트를 <br />
            생성해 볼까요?
          </>
        }
      />
      <div className="mt-10 grid grid-cols-2 gap-2">
        {Object.entries(CONTENT_WITH_ETC).map(([key, { icon, text }]) => (
          <TypeList
            key={key}
            onClick={() => {
              setSelected(key);
              setValue("category", key);
            }}
            direction="col"
            className={selected === key ? "bg-gray-900" : ""}
          >
            {icon}
            <span>{text}</span>
            {key === "ETC" && (
              <p className="caption-3-medium text-gray-600">
                (프로포즈, 파티, 소규모 상영회)
              </p>
            )}
          </TypeList>
        ))}
      </div>
    </>
  );
}
