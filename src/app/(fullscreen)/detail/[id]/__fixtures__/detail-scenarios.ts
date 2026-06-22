import type { DetailCTAAction } from "../_utils/resolve-detail-cta";
import type {
  EventButtonState,
  EventState,
  EventUserRole,
} from "app/_types/event-detail-state";

export type DetailScenarioRole = "PARTICIPANT" | "HOST" | "COMMON";

export type DetailScenarioAction = Exclude<
  DetailCTAAction,
  "LOGIN_REQUIRED" | "VERIFY_PHONE"
>;

export type DetailScenarioId =
  | "0-A-PARTICIPANT"
  | "0-A-HOST"
  | "0-B-COMMON"
  | "0-C-PARTICIPANT"
  | "0-C-HOST"
  | "1-A-PARTICIPANT"
  | "1-A-HOST"
  | "1-B-PARTICIPANT"
  | "1-B-HOST"
  | "2-A-PARTICIPANT"
  | "2-A-HOST"
  | "2-B-PARTICIPANT"
  | "2-B-HOST"
  | "3-A-PARTICIPANT"
  | "3-A-HOST"
  | "3-B-COMMON"
  | "4-A-COMMON"
  | "4-B-COMMON";

export interface DetailScenario {
  id: DetailScenarioId;
  stage:
    | "0-A"
    | "0-B"
    | "0-C"
    | "1-A"
    | "1-B"
    | "2-A"
    | "2-B"
    | "3-A"
    | "3-B"
    | "4-A"
    | "4-B";
  role: DetailScenarioRole;
  state: string;
  transition: string;
  statusTag:
    | "모집중"
    | "모집취소"
    | "모집완료"
    | "대관 진행중"
    | "대관확정"
    | "대관취소"
    | "상영완료"
    | "상영취소";
  perspective: string;
  action: DetailScenarioAction;
  api: {
    eventState: EventState;
    buttonState: EventButtonState | null;
    userRole: EventUserRole | null;
    needsConfirmation: boolean;
  };
  expected: {
    ctaDisabled: boolean;
  };
}

/**
 * 기획 상태표의 11개 단계를 역할별 18개 상세 페이지 시안으로 분리한 계약이다.
 *
 * needsConfirmation이 true인 항목은 현재 프론트 코드만으로 buttonState를
 * 확정할 수 없어 백엔드 응답 명세 확인이 필요하다.
 */
export const DETAIL_SCENARIOS: readonly DetailScenario[] = [
  {
    id: "0-A-PARTICIPANT",
    stage: "0-A",
    role: "PARTICIPANT",
    state: "모집중",
    transition: "주최자가 이벤트 생성",
    statusTag: "모집중",
    perspective: "모집중이며 신청할 수 있다.",
    action: "APPLY_EVENT",
    api: {
      eventState: "모집 중",
      buttonState: "신청하기",
      userRole: "참여자",
      needsConfirmation: false,
    },
    expected: { ctaDisabled: false },
  },
  {
    id: "0-A-HOST",
    stage: "0-A",
    role: "HOST",
    state: "모집중",
    transition: "주최자가 이벤트 생성",
    statusTag: "모집중",
    perspective: "모집중이며 모집을 취소할 수 있다.",
    action: "CANCEL_RECRUITMENT",
    api: {
      eventState: "모집 중",
      buttonState: "모집 취소",
      userRole: "주최자",
      needsConfirmation: false,
    },
    expected: { ctaDisabled: false },
  },
  {
    id: "0-B-COMMON",
    stage: "0-B",
    role: "COMMON",
    state: "모집취소",
    transition: "주최자가 이벤트 삭제",
    statusTag: "모집취소",
    perspective: "모집이 취소되어 더 이상 진행할 수 없다.",
    action: "NONE",
    api: {
      eventState: "모집 취소",
      buttonState: null,
      userRole: null,
      needsConfirmation: true,
    },
    expected: { ctaDisabled: true },
  },
  {
    id: "0-C-PARTICIPANT",
    stage: "0-C",
    role: "PARTICIPANT",
    state: "신청완료",
    transition: "참여자가 신청하기 클릭",
    statusTag: "모집중",
    perspective: "신청을 완료했으며 신청을 취소할 수 있다.",
    action: "CANCEL_APPLICATION",
    api: {
      eventState: "모집 중",
      buttonState: "신청 취소",
      userRole: "참여자",
      needsConfirmation: false,
    },
    expected: { ctaDisabled: false },
  },
  {
    id: "0-C-HOST",
    stage: "0-C",
    role: "HOST",
    state: "신청완료",
    transition: "참여자가 신청하기 클릭",
    statusTag: "모집중",
    perspective: "모집중이며 모집을 취소할 수 있다.",
    action: "CANCEL_RECRUITMENT",
    api: {
      eventState: "모집 중",
      buttonState: "모집 취소",
      userRole: "주최자",
      needsConfirmation: false,
    },
    expected: { ctaDisabled: false },
  },
  {
    id: "1-A-PARTICIPANT",
    stage: "1-A",
    role: "PARTICIPANT",
    state: "모집 마감",
    transition: "참여자 수가 최소 인원보다 적음",
    statusTag: "모집취소",
    perspective: "최소 인원 미달로 상영이 취소되었다.",
    action: "NONE",
    api: {
      eventState: "모집 취소",
      buttonState: "모집 취소",
      userRole: "참여자",
      needsConfirmation: false,
    },
    expected: { ctaDisabled: true },
  },
  {
    id: "1-A-HOST",
    stage: "1-A",
    role: "HOST",
    state: "모집 마감",
    transition: "참여자 수가 최소 인원보다 적음",
    statusTag: "모집취소",
    perspective: "최소 인원 미달로 상영을 진행할 수 없다.",
    action: "NONE",
    api: {
      eventState: "모집 취소",
      buttonState: "모집 취소",
      userRole: "주최자",
      needsConfirmation: false,
    },
    expected: { ctaDisabled: true },
  },
  {
    id: "1-B-PARTICIPANT",
    stage: "1-B",
    role: "PARTICIPANT",
    state: "모집 마감",
    transition: "참여자 수가 최소 인원 이상",
    statusTag: "모집완료",
    perspective: "모집이 완료되어 신청을 취소할 수 없다.",
    action: "NONE",
    api: {
      eventState: "모집 완료",
      buttonState: "신청 마감",
      userRole: "참여자",
      needsConfirmation: false,
    },
    expected: { ctaDisabled: true },
  },
  {
    id: "1-B-HOST",
    stage: "1-B",
    role: "HOST",
    state: "모집 마감",
    transition: "참여자 수가 최소 인원 이상",
    statusTag: "모집완료",
    perspective: "대관 진행 여부를 선택할 수 있다.",
    action: "SELECT_VENUE",
    api: {
      eventState: "모집 완료",
      buttonState: "대관 신청하기",
      userRole: "주최자",
      needsConfirmation: false,
    },
    expected: { ctaDisabled: false },
  },
  {
    id: "2-A-PARTICIPANT",
    stage: "2-A",
    role: "PARTICIPANT",
    state: "대관 신청",
    transition: "주최자가 대관 예 선택",
    statusTag: "대관 진행중",
    perspective: "대관 신청이 진행 중이며 신청을 취소할 수 없다.",
    action: "NONE",
    api: {
      eventState: "모집 완료",
      buttonState: "대관 진행 중",
      userRole: "참여자",
      needsConfirmation: false,
    },
    expected: { ctaDisabled: true },
  },
  {
    id: "2-A-HOST",
    stage: "2-A",
    role: "HOST",
    state: "대관 신청",
    transition: "주최자가 대관 예 선택",
    statusTag: "대관 진행중",
    perspective: "영화사의 대관 결과를 기다린다.",
    action: "NONE",
    api: {
      eventState: "모집 완료",
      buttonState: "대관 진행 중",
      userRole: "주최자",
      needsConfirmation: false,
    },
    expected: { ctaDisabled: true },
  },
  {
    id: "2-B-PARTICIPANT",
    stage: "2-B",
    role: "PARTICIPANT",
    state: "대관 신청",
    transition: "주최자가 대관 아니오 선택",
    statusTag: "대관취소",
    perspective: "주최자의 선택으로 상영이 취소되었다.",
    action: "NONE",
    api: {
      eventState: "대관 취소",
      buttonState: "대관 취소",
      userRole: "참여자",
      needsConfirmation: false,
    },
    expected: { ctaDisabled: true },
  },
  {
    id: "2-B-HOST",
    stage: "2-B",
    role: "HOST",
    state: "대관 신청",
    transition: "주최자가 대관 아니오 선택",
    statusTag: "대관취소",
    perspective: "대관을 진행하지 않아 상영을 진행할 수 없다.",
    action: "NONE",
    api: {
      eventState: "대관 취소",
      buttonState: "대관 취소",
      userRole: "주최자",
      needsConfirmation: false,
    },
    expected: { ctaDisabled: true },
  },
  {
    id: "3-A-PARTICIPANT",
    stage: "3-A",
    role: "PARTICIPANT",
    state: "대관확정",
    transition: "영화사가 대관확정 통보",
    statusTag: "대관확정",
    perspective: "대관이 확정되어 신청을 취소할 수 없다.",
    action: "MOVE_TO_TICKET",
    api: {
      eventState: "대관 확정",
      buttonState: "티켓으로 이동",
      userRole: "참여자",
      needsConfirmation: true,
    },
    expected: { ctaDisabled: false },
  },
  {
    id: "3-A-HOST",
    stage: "3-A",
    role: "HOST",
    state: "대관확정",
    transition: "영화사가 대관확정 통보",
    statusTag: "대관확정",
    perspective: "대관 확정 알림을 확인한다.",
    action: "MOVE_TO_TICKET",
    api: {
      eventState: "대관 확정",
      buttonState: "티켓으로 이동",
      userRole: "주최자",
      needsConfirmation: true,
    },
    expected: { ctaDisabled: false },
  },
  {
    id: "3-B-COMMON",
    stage: "3-B",
    role: "COMMON",
    state: "대관불가",
    transition: "영화사가 대관불가 통보",
    statusTag: "대관취소",
    perspective: "영화사의 대관 불가 통보로 상영이 취소되었다.",
    action: "NONE",
    api: {
      eventState: "대관 취소",
      buttonState: "대관 취소",
      userRole: null,
      needsConfirmation: false,
    },
    expected: { ctaDisabled: true },
  },
  {
    id: "4-A-COMMON",
    stage: "4-A",
    role: "COMMON",
    state: "상영 완료",
    transition: "상영일 경과 2일 후",
    statusTag: "상영완료",
    perspective: "상영이 완료되어 후기 요청을 확인한다.",
    action: "NONE",
    api: {
      eventState: "상영 완료",
      buttonState: "상영 완료",
      userRole: null,
      needsConfirmation: false,
    },
    expected: { ctaDisabled: true },
  },
  {
    id: "4-B-COMMON",
    stage: "4-B",
    role: "COMMON",
    state: "상영 완료",
    transition: "상영일 경과 2일 후",
    statusTag: "상영취소",
    perspective: "취소된 상영 상태를 확인한다.",
    action: "NONE",
    api: {
      eventState: "상영 취소",
      buttonState: "상영 취소",
      userRole: null,
      needsConfirmation: false,
    },
    expected: { ctaDisabled: true },
  },
] as const;
