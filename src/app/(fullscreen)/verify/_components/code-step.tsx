import { Button } from "@/components";
import { cn } from "@/utils/cn";
import { useState } from "react";

type CodeStepProps = {
  type: "phone" | "email";
  target: string;
  onComplete: (code: string) => void;
};
export default function CodeStep({ type, target, onComplete }: CodeStepProps) {
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

  const handleSubmit = () => {
    if (!isComplete) return;
    onComplete(fullCode);
  };
  return (
    <>
      <p className="body-1-semibold mt-9.25 text-gray-400">3/3</p>
      <h2 className="title-3-semibold mt-1.5">
        인증번호 4자리를 <br />
        입력해 주세요
      </h2>
      <p className="caption-1-medium mt-1.5 text-start text-gray-500">
        인증번호가 {target}으로 발송되었어요
      </p>

      <div className="mt-13 flex gap-2.75 px-9.25">
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
