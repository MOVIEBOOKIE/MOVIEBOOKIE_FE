import { StepHeader } from "@/components";
import { CRITERION } from "@/constants/trait";
import TypeList from "./type-list";

export default function Step2() {
  return (
    <div className="w-full">
      <StepHeader
        StepHeader="2/3"
        title={
          <>
            콘텐츠를 시청할 때, <br />
            어떤 기준으로 고르시나요?
          </>
        }
      />
      <div className="flex flex-col gap-2">
        {Object.entries(CRITERION).map(([key, { icon, text }]) => (
          <TypeList key={key} className="px-3.75 py-4.5">
            {icon}
            <span>{text}</span>
          </TypeList>
        ))}
      </div>
    </div>
  );
}
