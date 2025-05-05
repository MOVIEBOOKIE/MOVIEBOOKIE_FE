import { useEffect, useState } from "react";
import { Button, StepText } from "@/components";

type VerifyNumberProps = {
  type: "문자" | "이메일";
  target: string;
  onComplete: (code: string) => void;
  stepText?: string;
};

export default function VerifyNumber({
  type,
  target,
  onComplete,
  stepText,
}: VerifyNumberProps) {
  const [code, setCode] = useState(Array(4).fill(""));

  //자동 포커스
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

  return (
    <>
      <StepText
        stepText={stepText}
        title={
          <>
            {type}로 전송된 <br />
            인증번호 4자리를 입력해 주세요
          </>
        }
        description={<>인증번호가 {target}으로 발송되었어요</>}
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

      <div className="mt-auto mb-19">
        <Button
          disabled={!isComplete}
          onClick={() => onComplete(fullCode)}
          className={`${
            isComplete ? "bg-red-main text-white" : "bg-gray-900 text-gray-700"
          }`}
        >
          완료
        </Button>
      </div>
    </>
  );
}
