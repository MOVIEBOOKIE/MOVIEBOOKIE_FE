"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FixedLayout, StepHeader } from "@/components";
import {
  useVerifyEmail,
  useVerifySms,
} from "app/_hooks/onboarding/useVerifyCode";
import Loading from "app/loading";
import { PATHS } from "@/constants";

export default function VerifyNumberPage() {
  return (
    <Suspense fallback={<Loading />}>
      <VerifyNumberContent />
    </Suspense>
  );
}

function VerifyNumberContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") as "phone" | "email";
  const target = searchParams.get("target") || "";
  const router = useRouter();
  const [code, setCode] = useState(Array(4).fill(""));

  useEffect(() => {
    const firstInput = document.getElementById(
      "code-0",
    ) as HTMLInputElement | null;
    firstInput?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const updated = [...code];
    updated[index] = value;
    setCode(updated);

    if (value && index < code.length - 1) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const isComplete = code.every((char) => char !== "");
  const fullCode = code.join("");
  const { mutate: verifySmsCode } = useVerifySms();
  const { mutate: verifyEmailCode } = useVerifyEmail();
  const handleComplete = () => {
    const certificationCode = fullCode;
    if (type === "phone") {
      verifySmsCode(
        { phoneNum: target.replace(/-/g, ""), certificationCode },
        {
          onSuccess: () => router.push(PATHS.VERIFY_EMAIL),
          onError: handleError,
        },
      );
    } else {
      verifyEmailCode(
        { email: target, certificationCode },
        {
          onSuccess: () => router.push(PATHS.SET_PROFILE),
          onError: handleError,
        },
      );
    }
  };
  const handleError = () => {
    alert("인증번호가 올바르지 않아요. 다시 시도해 주세요.");
    setCode(Array(4).fill(""));
    const firstInput = document.getElementById("code-0");
    firstInput?.focus();
  };

  return (
    <FixedLayout
      title="회원가입"
      isButtonDisabled={!isComplete}
      onButtonClick={handleComplete}
    >
      <StepHeader
        StepHeader={type === "phone" ? "1/3" : "2/3"}
        title={
          <>
            {type === "phone" ? "문자" : "이메일"}로 전송된 <br />
            인증번호 4자리를 입력해 주세요
          </>
        }
        description={`인증번호가 ${target}으로 발송되었어요`}
      />

      <div className="mt-13 flex justify-center gap-2.75">
        {code.map((char, i) => (
          <input
            key={i}
            id={`code-${i}`}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            maxLength={1}
            value={char}
            onChange={(e) => handleChange(i, e.target.value)}
            className="title-1-semibold h-19.5 w-16.75 rounded-md bg-gray-900 text-center text-gray-100 focus:outline-none"
          />
        ))}
      </div>
    </FixedLayout>
  );
}
