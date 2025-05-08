import { StepHeader } from "@/components";
import TypeList from "./type-list";
import { MOOD } from "@/constants/trait";

interface Step1Props {
  nickname: string;
}

export default function Step1({ nickname }: Step1Props) {
  return (
    <div className="mt-8 w-full">
      <StepHeader
        StepHeader="1/3"
        title={
          <>
            요즘 {nickname}님의 일상은
            <br />
            어떤 느낌인가요?
          </>
        }
      />
      <div className="flex flex-col gap-2">
        {Object.entries(MOOD).map(([key, { icon, text }]) => (
          <TypeList key={key} className="px-3.75 py-4.5">
            {icon}
            <span>{text}</span>
          </TypeList>
        ))}
      </div>
    </div>
  );
}
