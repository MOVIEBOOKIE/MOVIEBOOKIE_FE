"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FixedLayout, StepHeader } from "@/components";

export default function EventDate() {
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
        StepHeader="2/7"
        title={
          <>
            이벤트를 진행할 <br />
            날짜를 선택해 주세요
          </>
        }
        description={
          <>이벤트 진행 날짜는 오늘을 기준으로 4주 뒤부터 설정 가능해요</>
        }
      />
      {/* 내용 */}
    </FixedLayout>
  );
}
