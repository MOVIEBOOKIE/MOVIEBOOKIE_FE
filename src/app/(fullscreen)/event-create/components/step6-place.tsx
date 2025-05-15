"use client";

import { StepHeader } from "@/components";
import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

export default function Step6() {
  const { setValue, control } = useFormContext();
  const min = useWatch({ control, name: "minParticipants" });
  const max = useWatch({ control, name: "maxParticipants" });
  return (
    <>
      <StepHeader
        StepHeader="6/7"
        title={
          <>
            이벤트를 상영할 <br />
            영화관을 선택해주세요
          </>
        }
        description={<>진행할 이벤트 특성에 어울리는 공간을 찾아보세요</>}
      />
    </>
  );
}
