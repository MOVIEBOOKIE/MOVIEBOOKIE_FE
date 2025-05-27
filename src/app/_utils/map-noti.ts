import { NotificationStatus } from "app/_stores/noti";

export const parseNotificationMeta = (
  rawTitle: string,
): {
  shortTitle: string;
  status: NotificationStatus;
} => {
  if (rawTitle.includes("생성 완료")) {
    return { shortTitle: "이벤트 생성 완료", status: "check" };
  }
  if (rawTitle.includes("신청 완료")) {
    return { shortTitle: "이벤트 신청 완료", status: "check" };
  }
  if (rawTitle.includes("대관 확정")) {
    return { shortTitle: "대관 확정", status: "check" };
  }
  if (rawTitle.includes("취소 완료")) {
    return { shortTitle: "이벤트 취소 완료", status: "check" };
  }

  if (rawTitle.includes("신청 취소")) {
    return { shortTitle: "이벤트 신청 취소", status: "cancel" };
  }
  if (rawTitle.includes("모집 취소")) {
    return { shortTitle: "이벤트 모집 취소", status: "cancel" };
  }
  if (rawTitle.includes("대관 취소")) {
    return { shortTitle: "대관 취소", status: "cancel" };
  }
  if (rawTitle.includes("대관 불가")) {
    return { shortTitle: "대관 불가", status: "cancel" };
  }

  if (rawTitle.includes("모집 완료")) {
    return { shortTitle: "이벤트 모집 완료", status: "confirm" };
  }
  if (rawTitle.includes("상영 완료")) {
    return { shortTitle: "이벤트 상영 완료", status: "confirm" };
  }

  return { shortTitle: rawTitle, status: "confirm" };
};
