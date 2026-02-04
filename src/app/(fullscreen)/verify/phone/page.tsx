"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FixedLayout, StepHeader } from "@/components";
import { formatPhoneNumber } from "@/utils/format-phone";
import { useSendSms } from "app/_hooks/onboarding/use-send-code";
import { useToastStore } from "app/_stores/use-toast-store";
import { appendNextQuery, getSafeNextPath } from "@/utils/next-path";

export default function PhoneStep() {
  const [phone, setPhone] = useState("");
  const isValidPhone = /^010-\d{4}-\d{4}$/.test(phone);
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextParam = searchParams.get("next");
  const nextPath = getSafeNextPath(nextParam);
  const { mutate: sendSmsCode } = useSendSms();
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToastStore();

  const handleSendCode = () => {
    if (!isValidPhone || submitting) return;
    setSubmitting(true);
    sendSmsCode(phone, {
      onSuccess: () => {
        setTimeout(() => setSubmitting(false), 500);
        const nextUrl = appendNextQuery(
          `/verify/verify-number?type=phone&target=${phone}`,
          nextPath,
        );
        if (nextPath) {
          router.replace(nextUrl);
        } else {
          router.push(nextUrl);
        }
      },
      onError: () => {
        (setSubmitting(false),
          showToast("SMS 발송에 실패했어요. 다시 시도해 주세요.", "alert"));
      },
    });
  };
  return (
    <FixedLayout
      title="회원가입"
      isButtonDisabled={!isValidPhone}
      onButtonClick={handleSendCode}
      isLoading={submitting}
    >
      <StepHeader
        StepHeader="1/2"
        title={
          <>
            이벤트 신청을 위해 <br />
            전화번호를 입력해 주세요
          </>
        }
        description={
          <>
            전화번호는 주최자와 원활한 연락을 위해 사용되며, <br />
            여러분의 소중한 정보는 안전하게 보호돼요
          </>
        }
      />

      <div className="mt-12.5">
        <label className="body-2-medium text-gray-400">전화번호</label>
        <input
          type="tel"
          inputMode="tel"
          placeholder="ex) 010-1234-5678"
          value={phone}
          onChange={(e) => {
            const formatted = formatPhoneNumber(e.target.value);
            setPhone(formatted);
          }}
          className="w-full border-b border-gray-700 bg-transparent pt-4.25 pb-1.5 text-white placeholder-gray-600 focus:outline-none"
        />
      </div>
    </FixedLayout>
  );
}
