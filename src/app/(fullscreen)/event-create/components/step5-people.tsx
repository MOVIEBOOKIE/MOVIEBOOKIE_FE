"use client";

import { useFormContext } from "react-hook-form";
import { StepHeader } from "@/components";

export default function Step5() {
  return (
    <>
      <StepHeader
        StepHeader="5/7"
        title={
          <>
            이벤트를 진행하기 위해 <br />
            인원을 설정해주세요
          </>
        }
        description={
          <>최소 1명부터 입력 가능하며 주최자는 인원 수에 포함되지 않아요</>
        }
      />
      sds
    </>
  );
}
