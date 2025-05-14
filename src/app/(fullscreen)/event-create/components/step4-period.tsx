"use client";

import { StepHeader } from "@/components";
import { useFormContext } from "react-hook-form";
import Calendar from "./calendar";
import DeadlineCalendar from "./period-calendar";

export default function Step4() {
  const { watch, setValue } = useFormContext();
  const selectedDate = watch("eventDate");

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
          <>이벤트 진행 날짜 기준, 최대 2주 전까지만 설정할 수 있어요</>
        }
      />
      <DeadlineCalendar
        eventDate={selectedDate}
        selectedDeadline={watch("event-deadline")}
        onSelectDeadline={(date) => setValue("event-deadline", date)}
      />
    </>
  );
}
