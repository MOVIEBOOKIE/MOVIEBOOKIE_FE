import { PATHS } from "@/constants";

export const getNotificationTargetUrl = (
  shortTitle: string,
  eventId?: number,
): string | null => {
  if (
    [
      "대관 확정",
      "이벤트 취소 완료",
      "이벤트 신청 취소",
      "이벤트 모집 취소",
      "대관 취소",
      "대관 불가",
      "이벤트 모집 완료",
    ].includes(shortTitle)
  ) {
    return eventId ? PATHS.EVENT_DETAIL(eventId) : null;
  }

  if (["이벤트 신청 완료"].includes(shortTitle)) {
    return PATHS.EVENT;
  }

  if (["이벤트 상영 완료"].includes(shortTitle)) {
    return eventId ? PATHS.EVENT_COMPLETED(eventId) : null;
  }

  if (["이벤트 생성 완료"].includes(shortTitle)) {
    return `${PATHS.EVENT}?tab=mine`;
  }

  return null;
};
