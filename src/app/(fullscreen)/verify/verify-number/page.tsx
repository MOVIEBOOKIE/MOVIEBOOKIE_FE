"use client";

import type React from "react";
import { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FixedLayout, StepHeader, Toast } from "@/components";
import {
  useVerifyEmail,
  useVerifySms,
} from "app/_hooks/onboarding/use-verify-code";
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
  const [showToast, setShowToast] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  // 키보드 감지 로직
  useEffect(() => {
    const initialViewportHeight = window.innerHeight;
    const initialVisualViewportHeight =
      window.visualViewport?.height || window.innerHeight;

    const handleViewportChange = () => {
      const currentHeight = window.visualViewport?.height || window.innerHeight;
      const heightDifference = initialVisualViewportHeight - currentHeight;

      // 키보드가 나타났는지 판단 (높이 차이가 150px 이상일 때)
      if (heightDifference > 150) {
        setIsKeyboardVisible(true);
        setKeyboardHeight(heightDifference);
      } else {
        setIsKeyboardVisible(false);
        setKeyboardHeight(0);
      }
    };

    const handleResize = () => {
      const currentHeight = window.innerHeight;
      const heightDifference = initialViewportHeight - currentHeight;

      if (heightDifference > 150) {
        setIsKeyboardVisible(true);
        setKeyboardHeight(heightDifference);
      } else {
        setIsKeyboardVisible(false);
        setKeyboardHeight(0);
      }
    };

    // Visual Viewport API 지원 확인 (iOS Safari 13+)
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleViewportChange);
    } else {
      // 폴백: window resize 이벤트 사용
      window.addEventListener("resize", handleResize);
    }

    // 초기 포커스
    const timer = setTimeout(() => {
      const firstInput = document.getElementById(
        "code-0",
      ) as HTMLInputElement | null;
      firstInput?.focus();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener(
          "resize",
          handleViewportChange,
        );
      } else {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  // Input 포커스/블러 이벤트 추가 처리
  const handleInputFocus = useCallback(() => {
    // iOS에서 약간의 지연 후 키보드 상태 확인
    setTimeout(() => {
      const currentHeight = window.visualViewport?.height || window.innerHeight;
      const initialHeight = window.screen.height;
      const heightDifference = initialHeight - currentHeight;

      if (heightDifference > 150) {
        setIsKeyboardVisible(true);
        setKeyboardHeight(heightDifference);
      }
    }, 300);
  }, []);

  const handleInputBlur = useCallback(() => {
    // 모든 input이 포커스를 잃었는지 확인
    setTimeout(() => {
      const activeElement = document.activeElement;
      const isInputFocused = activeElement && activeElement.tagName === "INPUT";

      if (!isInputFocused) {
        setIsKeyboardVisible(false);
        setKeyboardHeight(0);
      }
    }, 100);
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
    setShowToast(true);
    setCode(Array(4).fill(""));
    const firstInput = document.getElementById("code-0");
    firstInput?.focus();
  };

  return (
    <div className="relative">
      <FixedLayout
        title="회원가입"
        isButtonDisabled={!isComplete}
        onButtonClick={handleComplete}
        className={`transition-transform duration-300 ease-in-out ${
          isKeyboardVisible
            ? `transform -translate-y-[${Math.min(keyboardHeight, 300)}px]`
            : "translate-y-0 transform"
        }`}
        style={{
          transform: isKeyboardVisible
            ? `translateY(-${Math.min(keyboardHeight, 300)}px)`
            : "translateY(0px)",
          transition: "transform 0.3s ease-in-out",
        }}
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
              onKeyDown={(e) => handleKeyDown(i, e)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
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

      <style jsx global>{`
        @supports (-webkit-touch-callout: none) {
          /* iOS Safari 전용 스타일 */
          .ios-keyboard-adjust {
            padding-bottom: env(keyboard-inset-height, 0px);
          }
        }

        /* PWA 환경에서 키보드 처리 */
        @media (display-mode: standalone) {
          body {
            padding-bottom: env(keyboard-inset-height, 0px);
          }
        }
      `}</style>
    </div>
  );
}
