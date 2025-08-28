type Common = {
  site_type?: "core" | "admin";
  session_id?: string;
  user_id?: string;
};
let common: Common = {};

export const setCommon = (next: Common) => {
  common = { ...common, ...next };
};

export const dlPush = (event: string, params: Record<string, any> = {}) => {
  if (typeof window === "undefined") return;
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({ event, ...common, ...params });
};

// 페이지뷰(가상)
export const pageView = (url: string, extra: Record<string, any> = {}) =>
  dlPush("page_view", { page_location: url, ...extra });

// 정의서 이벤트 래퍼
export const ev = {
  // 1) 기본 활동
  sessionStart: () => dlPush("session_start"),
  sessionEnd: () => dlPush("session_end"),
  sessionDuration: (duration_sec: number) =>
    dlPush("session_duration", { duration_sec }),
  homeView: () => dlPush("home_view"),
  // 2) 이벤트 관련
  contentsClick: (content_id: string) =>
    dlPush("contents_click", { content_id }),
  contentsApply: (content_id: string) =>
    dlPush("contents_apply", { content_id }),
  // 3) 이벤트 생성/주최
  eventCreate: (event_id: string) => dlPush("event_create", { event_id }),
  eventCreateCancel: (event_id: string) =>
    dlPush("event_create_cancel", { event_id }),
  eventComplete: (event_id: string) => dlPush("event_complete", { event_id }),
  // 4) 마이페이지
  mypageView: () => dlPush("mypage_view"),
  ticketClick: () => dlPush("ticket_click"),
  profileView: () => dlPush("profile_view"),
};
