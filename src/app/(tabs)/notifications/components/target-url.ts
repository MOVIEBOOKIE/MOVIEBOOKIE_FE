// app/(tabs)/notification/components/target-url.ts
import { PATHS } from "@/constants";

export function getNotificationTargetUrl(
  type: string,
  eventId?: number,
): string | null {
  if (!eventId) return null;

  // 알림 타입에 따라 이동할 페이지 결정
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
      // 후기 작성 페이지로 이동 (경로는 실제 구조에 맞게 수정)
      return `/detail/${eventId}/review`;

    default:
      return `/detail/${eventId}`;
  }
}
