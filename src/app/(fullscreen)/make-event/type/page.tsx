"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FixedLayout from "@/components/fixedlayout";
import { StepHeader } from "@/components";
import { CONTENT } from "@/constants/trait";
import TypeList from "app/(fullscreen)/trait/_components/type-list";

export default function EventType() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <FixedLayout
      title="이벤트 생성"
      showCloseButton={true}
      isButtonDisabled={!selected}
      onButtonClick={() => {
        router.push(`/make-event/date`);
      }}
    >
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
        {Object.entries(CONTENT).map(([key, { icon, text }]) => (
          <TypeList
            key={key}
            className={`w-full cursor-pointer flex-col justify-center py-7.5 ${
              selected === key ? "bg-gray-900" : ""
            }`}
            onClick={() => setSelected(key)}
          >
            {icon}
            <span>{text}</span>
          </TypeList>
        ))}
      </div>
    </FixedLayout>
  );
}
