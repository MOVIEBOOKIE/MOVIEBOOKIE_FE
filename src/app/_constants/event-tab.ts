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

export const TOGGLE_LABELS = ["모집", "대관", "취소"] as const;
export type ToggleLabel = (typeof TOGGLE_LABELS)[number];

export const TOGGLE_TO_TYPE: Record<ToggleLabel, 0 | 1 | 2> = {
  모집: 0,
  대관: 1,
  취소: 2,
};
