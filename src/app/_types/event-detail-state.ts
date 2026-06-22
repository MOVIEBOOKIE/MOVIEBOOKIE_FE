export const EVENT_STATES = [
  "모집 중",
  "모집 완료",
  "모집 취소",
  "대관 확정",
  "대관 취소",
  "상영 완료",
  "상영 취소",
] as const;

export type EventState = (typeof EVENT_STATES)[number];

export const EVENT_BUTTON_STATES = [
  "신청하기",
  "신청 취소",
  "모집 취소",
  "대관 신청하기",
  "대관 진행 중",
  "티켓으로 이동",
  "신청 마감",
] as const;

export type EventButtonState = (typeof EVENT_BUTTON_STATES)[number];

export const EVENT_USER_ROLES = ["참여자", "주최자"] as const;

export type EventUserRole = (typeof EVENT_USER_ROLES)[number];
