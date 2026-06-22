import type { EventState, EventUserRole } from "app/_types/event-detail-state";
import { EVENT_STATES } from "app/_types/event-detail-state";

export type DetailCTAAction =
  | "LOGIN_REQUIRED"
  | "VERIFY_PHONE"
  | "APPLY_EVENT"
  | "CANCEL_APPLICATION"
  | "CANCEL_RECRUITMENT"
  | "SELECT_VENUE"
  | "MOVE_TO_TICKET"
  | "NONE";

interface ResolveDetailCTAParams {
  eventState?: EventState | string | null;
  buttonState?: string | null;
  userRole?: EventUserRole | string | null;
  loggedIn: boolean;
  phoneVerified: boolean;
  isLoading?: boolean;
}

interface DetailCTA {
  label: string;
  disabled: boolean;
  action: DetailCTAAction;
}

const BUTTON_ACTIONS: Record<
  string,
  Exclude<DetailCTAAction, "LOGIN_REQUIRED" | "VERIFY_PHONE">
> = {
  신청하기: "APPLY_EVENT",
  "신청 취소": "CANCEL_APPLICATION",
  "모집 취소": "CANCEL_RECRUITMENT",
  "대관 신청하기": "SELECT_VENUE",
  "티켓으로 이동": "MOVE_TO_TICKET",
};

const KNOWN_EVENT_STATES = new Set<string>(EVENT_STATES);

export function resolveDetailCTA({
  eventState,
  buttonState,
  userRole,
  loggedIn,
  phoneVerified,
  isLoading = false,
}: ResolveDetailCTAParams): DetailCTA {
  const label = buttonState ?? "";
  const buttonAction = buttonState ? BUTTON_ACTIONS[buttonState] : undefined;
  const isKnownEventState = eventState
    ? KNOWN_EVENT_STATES.has(eventState)
    : false;
  const isDisabledState =
    !isKnownEventState ||
    !buttonAction ||
    eventState === "모집 취소" ||
    eventState === "대관 취소" ||
    (eventState === "모집 완료" && userRole !== "주최자") ||
    isLoading;

  if (isDisabledState) {
    return {
      label,
      disabled: true,
      action: "NONE",
    };
  }

  if (!loggedIn) {
    return {
      label,
      disabled: false,
      action: "LOGIN_REQUIRED",
    };
  }

  if (!phoneVerified) {
    return {
      label,
      disabled: false,
      action: "VERIFY_PHONE",
    };
  }

  return {
    label,
    disabled: false,
    action: buttonAction,
  };
}
