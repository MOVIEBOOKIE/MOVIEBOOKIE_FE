import { CheckboxIcon } from "@/icons/index";
import FixedLayout from "./fixed-layout";

interface CompleteProps {
  state: string;
  buttonText: string;
  onButtonClick(): void;
}

export default function Complete({
  state,
  buttonText,
  onButtonClick,
}: CompleteProps) {
  return (
    <FixedLayout
      isHeader={false}
      buttonText={buttonText}
      onButtonClick={onButtonClick}
      state="full"
    >
      <div className="flex h-[calc(100vh-126px)] flex-col items-center justify-center gap-3">
        <CheckboxIcon width={45} height={45} className="mb-2" />
        <p className="title-1-bold text-gray-white">{state}이 완료됐어요!</p>
        <p className="body-3-regular text-center text-gray-500">
          모집 기간 내 인원 미달성시,
          <br />
          이벤트 진행이 취소될 수 있어요
        </p>
      </div>
    </FixedLayout>
  );
}
