import { Button } from "@/components";
import StepHeader from "@/components/step-text";
import { cn } from "@/utils/cn";
import { useState } from "react";

type CodeStepProps = {
  type: "문자" | "이메일";
  target: string;
  onComplete: (code: string) => void;
  stepText?: string;
};
export default function CodeStep({
  type,
  target,
  onComplete,
  stepText,
}: CodeStepProps) {
  const [code, setCode] = useState(["", "", "", ""]);

  const handleChange = (i: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...code];
    next[i] = value;
    setCode(next);
    if (value && i < 3) {
      const nextInput = document.getElementById(`code-${i + 1}`);
      nextInput?.focus();
    }
  };

  const isComplete = code.every((c) => c.length === 1);
  const fullCode = code.join("");

  return (
    <>
      <StepHeader
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
        {code.map((digit, i) => (
          <input
            key={i}
            id={`code-${i}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            className="title-1-semibold h-19.5 w-16.75 rounded-md bg-gray-900 text-center text-gray-100 focus:outline-none"
          />
        ))}
      </div>

      <div className="mt-auto mb-19">
        <Button
          disabled={!isComplete}
          onClick={() => onComplete(fullCode)}
          className={cn(
            isComplete ? "bg-red-main text-white" : "bg-gray-900 text-gray-700",
          )}
        >
          완료
        </Button>
      </div>
    </>
  );
}
