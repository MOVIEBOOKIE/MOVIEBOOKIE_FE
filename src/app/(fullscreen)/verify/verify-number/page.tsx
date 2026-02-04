"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FixedLayout, StepHeader, Toast } from "@/components";
import {
  useVerifyEmail,
  useVerifySms,
} from "app/_hooks/onboarding/use-verify-code";
import Loading from "app/loading";
import { PATHS } from "@/constants";
import { getMyPageInfo } from "app/_apis/auth/mypage";
import { useUserStore } from "app/_stores/use-user-store";
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
  const nextParam = searchParams.get("next");
  const nextPath = nextParam && nextParam.startsWith("/") ? nextParam : "";
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const [code, setCode] = useState(Array(4).fill(""));
  const [showToast, setShowToast] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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

  const refreshUser = async () => {
    try {
      const res = await getMyPageInfo();
      if (res) {
        setUser({
          email: res.email,
          certificationEmail: res.certificationEmail,
          nickname: res.username,
          profileImage: res.profileImage,
          userTypeTitle: res.userTypeTitle,
          hostExperienceCount: res.hostExperienceCount,
          participationExperienceCount: res.participationExperienceCount,
          ticketCount: res.ticketCount,
          phoneNumber: res.phoneNumber,
        });
      }
    } catch {
      // noop: fallback to existing store state
    }
  };

  const handleComplete = () => {
    const certificationCode = fullCode;
    if (submitting) return;
    if (type === "phone") {
      setSubmitting(true);
      verifySmsCode(
        { phoneNum: target.replace(/-/g, ""), certificationCode },
        {
          onSuccess: async () => {
            setTimeout(() => setSubmitting(false), 500);
            await refreshUser();
            const nextQuery = nextPath
              ? `?next=${encodeURIComponent(nextPath)}`
              : "";
            const nextUrl = `${PATHS.VERIFY_EMAIL}${nextQuery}`;
            if (nextPath) {
              router.replace(nextUrl);
            } else {
              router.push(nextUrl);
            }
          },
          onError: handleError,
        },
      );
    } else {
      setSubmitting(true);
      verifyEmailCode(
        { email: target, certificationCode },
        {
          onSuccess: async () => {
            setTimeout(() => setSubmitting(false), 500);
            await refreshUser();
            if (nextPath) {
              router.replace(nextPath);
            } else {
              router.push(PATHS.HOME);
            }
          },
          onError: handleError,
        },
      );
    }
  };
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && code[index] === "" && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();

      const updated = [...code];
      updated[index - 1] = "";
      setCode(updated);
    }
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleError = () => {
    setSubmitting(false);
    setShowToast(true);
    setCode(Array(4).fill(""));
    const firstInput = document.getElementById("code-0");
    firstInput?.focus();
  };
  return (
    <FixedLayout
      title="회원가입"
      isButtonDisabled={!isComplete}
      onButtonClick={handleComplete}
      isLoading={submitting}
    >
      <StepHeader
        StepHeader={type === "phone" ? "1/2" : "2/2"}
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
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="title-1-semibold h-19.5 w-16.75 rounded-md bg-gray-900 text-center text-gray-100 focus:outline-none"
          />
        ))}
      </div>
      {showToast && (
        <div className="mt-6 px-2">
          <Toast>인증번호가 올바르지 않아요. 다시 시도해 주세요.</Toast>
        </div>
      )}
    </FixedLayout>
  );
}
