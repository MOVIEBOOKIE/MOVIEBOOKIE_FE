export const STATUS_MAP = {
  RECRUITMENT: {
    모집: ["모집중", "모집완료", "모집취소"],
    확정: ["대관확정", "상영완료"],
  },
  PARTICIPATION: {
    신청: ["모집중", "모집완료", "모집취소"],
    확정: ["대관확정", "상영완료"],
  },
  TICKET: {
    티켓: ["대관확정", "상영완료"],
  },
};

export const EVENT_TOGGLES = {
  APPLY: {
    LABELS: ["모집 이벤트", "확정 이벤트"] as const,
  },
  MINE: {
    LABELS: ["신청 이벤트", "확정 이벤트"] as const,
  },
} as const;

export const TOGGLE_TO_TYPE = {
  "모집 이벤트": 0,
  "신청 이벤트": 0,
  "확정 이벤트": 1,
} as const;

export const TOGGLE_LABELS = [
  ...EVENT_TOGGLES.APPLY.LABELS,
  ...EVENT_TOGGLES.MINE.LABELS,
] as const;

export type ToggleLabel = keyof typeof TOGGLE_TO_TYPE;
export type ToggleType = (typeof TOGGLE_LABELS)[number];
