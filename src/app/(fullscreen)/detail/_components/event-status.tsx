import AlertContent from "./alert-content";

interface EventStatusProps {
  eventState: string;
  recruitmentRate?: number;
}

export default function EventStatus({
  eventState,
  recruitmentRate,
}: EventStatusProps) {
  switch (eventState) {
    case "모집 취소":
      return (
        <AlertContent iconType="danger">
          모집이 취소된 이벤트입니다.
        </AlertContent>
      );
    case "모집 완료":
      return (
        <AlertContent iconType="check">
          모집이 완료된 이벤트입니다.
        </AlertContent>
      );
    case "대관 확정":
      return (
        <AlertContent iconType="check">
          대관이 확정된 이벤트입니다.
        </AlertContent>
      );
    case "대관 취소":
      return (
        <AlertContent iconType="danger">
          대관이 취소된 이벤트입니다.
        </AlertContent>
      );
    case "상영 완료":
      return (
        <AlertContent iconType="check">
          상영이 완료된 이벤트입니다.
        </AlertContent>
      );
    case "상영 취소":
      return (
        <AlertContent iconType="danger">
          상영이 취소된 이벤트입니다.
        </AlertContent>
      );
    default:
      return (
        <>
          <div className="mt-3.5 flex justify-between">
            <p className="body-3-medium text-gray-500">모집 달성률</p>
            <p className="body-2-semibold text-red-main">
              {recruitmentRate ?? "0"}%
            </p>
          </div>
          <div className="mt-2.5 h-1 w-full rounded-[10px] bg-gray-800">
            <div
              className="bg-red-main h-1 rounded-[10px]"
              style={{ width: `${recruitmentRate ?? 0}%` }}
            />
          </div>
        </>
      );
  }
}
