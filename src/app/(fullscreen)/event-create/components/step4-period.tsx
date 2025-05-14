"use client";

import { StepHeader } from "@/components";
import { CONTENT } from "@/constants/trait";
import { EtcIcon } from "@/icons/index";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import Calendar from "./calendar";

export default function Step4() {
  const { watch, setValue } = useFormContext();

  return (
    <>
      <StepHeader
        StepHeader="2/7"
        title={<>기간</>}
        description={
          <>이벤트 진행 날짜는 오늘을 기준으로 4주 뒤부터 설정 가능해요</>
        }
      />
    </>
  );
}
