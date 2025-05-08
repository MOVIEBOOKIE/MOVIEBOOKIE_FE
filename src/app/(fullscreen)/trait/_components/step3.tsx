import { StepHeader } from "@/components";
import { CONTENT } from "@/constants/trait";
import TypeList from "./type-list";

interface Step3Props {
  nickname: string;
}

export default function Step3({ nickname }: Step3Props) {
  return (
    <div className="w-full">
      <StepHeader
        StepHeader="3/3"
        title={
          <>
            {nickname}님이 자꾸 손이 가는 <br />
            콘텐츠는 무엇인가요?
          </>
        }
      />
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(CONTENT).map(([key, { icon, text }]) => (
          <TypeList key={key} className="w-full flex-col justify-center py-7.5">
            {icon}
            <span>{text}</span>
          </TypeList>
        ))}
      </div>
    </div>
  );
}
