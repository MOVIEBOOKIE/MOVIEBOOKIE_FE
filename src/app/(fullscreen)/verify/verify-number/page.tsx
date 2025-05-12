"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Header, Button, StepHeader } from "@/components";
import FixedLayout from "@/components/fixedlayout";

export default function VerifyNumberPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") as "phone" | "email";
  const target = searchParams.get("target") || "";
  const router = useRouter();
  const [code, setCode] = useState(Array(4).fill(""));

  // 자동 포커스
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

  const handleComplete = () => {
    if (type === "phone") {
      router.push("/verify/email");
    } else {
      router.push("/set-profile");
    }
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
