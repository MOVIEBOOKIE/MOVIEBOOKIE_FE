export function getNotificationTargetUrl(
  type: string,
  eventId?: number,
): string | null {
  if (!eventId) return null;

  //TODO: 다시 기획안 확인 후 URL 수정 필요
  switch (type) {
    case "이벤트 생성 완료 알림":
    case "이벤트 삭제 알림":
    case "모집 마감 알림 (인원부족)":
    case "모집 마감 알림 (인원충족)":
    case "모집 완료 알림":
    case "대관 확정 알림":
    case "대관 불가 알림":
    case "대관 취소 알림":
      return `/detail/${eventId}`;

    case "이벤트 신청 완료 알림":
    case "이벤트 신청 취소 알림":
      return `/detail/${eventId}`;

    case "상영 완료 후기 요청 알림":
      return `/detail/${eventId}/review`;

    default:
      return `/detail/${eventId}`;
  }
}
