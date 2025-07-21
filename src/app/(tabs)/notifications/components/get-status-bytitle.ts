import { NotificationStatus } from "./item";

export const getStatusByTitle = (title: string): NotificationStatus => {
  if (["모집 완료", "상영 완료"].some((kw) => title.includes(kw))) {
    return "confirm";
  }
  if (
    ["모집 취소", "대관 불가", "신청 취소", "대관 취소"].some((kw) =>
      title.includes(kw),
    )
  ) {
    return "cancel";
  }
  if (
    ["취소 완료", "대관 확정", "생성 완료"].some((kw) => title.includes(kw))
  ) {
    return "check";
  }
  return "check";
};
