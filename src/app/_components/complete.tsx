import { CheckboxIcon, AlertIcon } from "@/icons/index";
import FixedLayout from "./fixed-layout";

interface CompleteProps {
  status: "success" | "fail";
  action: string;
  buttonText: string;
  onButtonClick(): void;
}

export default function Complete({
  status,
  action,
  buttonText,
  onButtonClick,
}: CompleteProps) {
  const isSuccess = status === "success";

  return (
    <FixedLayout
      isHeader={false}
      buttonText={buttonText}
      onButtonClick={onButtonClick}
      state="full"
    >
      <div className="flex h-[calc(100vh-126px)] flex-col items-center justify-center gap-3">
        {isSuccess ? (
          <CheckboxIcon width={45} height={45} className="mb-2" />
        ) : (
          <AlertIcon width={45} height={45} className="mb-2" />
        )}

        <p className="title-1-bold text-gray-white">
          {action}이 {isSuccess ? "완료됐어요!" : "실패했어요"}
        </p>

        <p className="body-3-regular text-center text-gray-500">
          {isSuccess ? (
            <>
              모집 기간 내 인원 미달성시,
              <br />
              이벤트 진행이 취소될 수 있어요
            </>
          ) : (
            <>
              해당 이벤트가 진행될 영화관이 <br />
              이미 예약되었어요
            </>
          )}
        </p>
      </div>
    </FixedLayout>
  );
}
