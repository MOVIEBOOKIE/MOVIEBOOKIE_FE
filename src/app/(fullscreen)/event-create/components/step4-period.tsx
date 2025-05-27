"use client";

import { StepHeader } from "@/components";
import { useFormContext } from "react-hook-form";
import DeadlineCalendar from "./period-calendar";
import dayjs from "dayjs";

export default function Step4() {
  const { watch, setValue } = useFormContext();
  const selectedDate = watch("eventDate"); // 대관 날짜
  const selectedDeadline = watch("recruitmentEnd"); // 마감일

  const handleSelectDeadline = (date: string) => {
    const today = dayjs().format("YYYY-MM-DD");
    setValue("recruitmentStart", today);
    setValue("recruitmentEnd", date);
  };

  return (
    <>
      <StepHeader
        StepHeader="4/7"
        title={
          <>
            이벤트 참여자를 <br />
            모집할 기간을 설정해 주세요
          </>
        }
        description={
          <>모집 기간은 오늘부터, 진행일 기준 최대 2주 전까지만 가능해요 </>
        }
      />
      <DeadlineCalendar
        eventDate={selectedDate}
        selectedDeadline={selectedDeadline}
        onSelectDeadline={handleSelectDeadline}
      />
    </>
  );
}
