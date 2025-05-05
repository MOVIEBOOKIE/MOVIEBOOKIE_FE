import { Button, StepText } from "@/components";
import { cn } from "@/utils/cn";
import { useState } from "react";

export default function EmailStep({
  onNext,
  stepText,
}: {
  onNext: (email: string) => void;
  stepText: string;
}) {
  const [emailId, setEmailId] = useState("");
  const [emailDomain, setEmailDomain] = useState("naver.com");
  const isValidEmail = /^[a-zA-Z0-9._%+-]+$/.test(emailId);

  return (
    <>
      <StepText
        stepText={stepText}
        title={
          <>
            자주 사용하는 이메일을 <br />
            입력해 주세요
          </>
        }
        description={
          <>
            이메일은 대관 관련 중요한 소식 안내에 사용되며, <br />
            여러분의 소중한 정보는 안전하게 보호돼요
          </>
        }
      />

      <div className="mt-13">
        <label className="body-2-medium text-gray-400">이메일</label>
        <div className="flex gap-2 pt-4.25">
          <input
            type="text"
            placeholder="ex) moviebookie"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            className="flex-1 border-b border-gray-700 bg-transparent pb-1.5 text-gray-100 placeholder-gray-600 focus:outline-none"
          />
          <select
            value={emailDomain}
            onChange={(e) => setEmailDomain(e.target.value)}
            className="body-2-medium flex-1 border-b border-gray-700 bg-transparent pb-1.5 focus:outline-none"
          >
            <option value="naver.com" className="bg-gray-800">
              @naver.com
            </option>
          </select>
        </div>
      </div>

      <div className="mt-auto mb-19">
        <Button
          disabled={!isValidEmail}
          onClick={() => onNext(emailId)}
          className={cn(
            isValidEmail
              ? "bg-red-main text-white"
              : "bg-gray-900 text-gray-700",
          )}
        >
          인증번호 보내기
        </Button>
      </div>
    </>
  );
}
