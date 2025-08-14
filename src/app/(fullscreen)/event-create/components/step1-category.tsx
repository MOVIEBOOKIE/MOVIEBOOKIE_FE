"use client";

import { StepHeader } from "@/components";
import { CONTENT } from "@/constants/trait";
import TypeList from "@/components/type-list";
import { EtcIcon } from "@/icons/index";
import { useFormContext } from "react-hook-form";
import { useEventFormStore } from "app/_stores/use-event-create-form";

const CONTENT_WITH_ETC = {
  ...CONTENT,
  기타: {
    icon: <EtcIcon className="h-7 w-7" />,
    text: "기타",
  },
};

export default function Step1() {
  const { setValue } = useFormContext();
  const formData = useEventFormStore((state) => state.formData);
  const setFormData = useEventFormStore((state) => state.setFormData);

  const selected = formData.mediaType;

  return (
    <>
      <StepHeader
        StepHeader="1/7"
        title={
          <>
            어떤 카테고리의 이벤트를 <br />
            만들어 볼까요?
          </>
        }
      />
      <div className="mt-10 grid grid-cols-2 gap-2">
        {Object.entries(CONTENT_WITH_ETC).map(([key, { icon, text }]) => (
          <TypeList
            key={key}
            onClick={() => {
              setFormData({ ...formData, mediaType: text });
              setValue("mediaType", text);
            }}
            direction="col"
            className={selected === text ? "bg-gray-900" : ""}
          >
            {icon}
            <span>{text}</span>
            {key === "기타" && (
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
