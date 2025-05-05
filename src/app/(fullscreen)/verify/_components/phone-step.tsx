import { Button, StepText } from "@/components";
import { cn } from "@/utils/cn";
import { useState } from "react";

export default function PhoneStep({
  onNext,
  stepText,
}: {
  onNext: (phone: string) => void;
  stepText: string;
}) {
  const [phone, setPhone] = useState("");
  const isValidPhone = /^010-\d{4}-\d{4}$/.test(phone);

  return (
    <>
      <StepText
        stepText={stepText}
        title={
          <>
            무비부키 시작을 위해 <br />
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

      <div className="mt-13">
        <label className="body-2-medium text-gray-400">전화번호</label>
        <input
          type="tel"
          inputMode="tel"
          placeholder="ex) 010-1234-5678"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border-b border-gray-700 bg-transparent pt-4.25 pb-1.5 text-white placeholder-gray-600 focus:outline-none"
        />
      </div>
      <div className="mt-auto mb-19">
        <Button
          disabled={!isValidPhone}
          onClick={() => onNext(phone)}
          className={cn(
            isValidPhone
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
