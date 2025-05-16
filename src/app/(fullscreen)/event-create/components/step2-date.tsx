"use client";

import { StepHeader } from "@/components";
import { useFormContext } from "react-hook-form";
import Calendar from "./calendar";

export default function Step2() {
  const { watch, setValue } = useFormContext();
  const selectedDate = watch("eventDate");

  return (
    <>
      <StepHeader
        StepHeader="2/7"
        title={
          <>
            이벤트를 진행할 <br />
            날짜를 선택해 주세요
          </>
        }
        description={
          <>
            이벤트 진행 날짜는 오늘을 기준으로
            <span className="text-gray-300"> 4주 뒤부터</span> 설정 가능해요
          </>
        }
      />
      <Calendar
        selectedDate={selectedDate}
        onSelectDate={(date) => setValue("eventDate", date)}
      />
    </>
  );
}
