export type Common = {
  site_type?: "core" | "admin";
  session_id?: string;
  user_id?: number;
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

export const pageView = (url: string, extra: Record<string, any> = {}) =>
  dlPush("page_view", { page_location: url, ...extra });

export const ev = {
  sessionStart: () => dlPush("session_start"),
  sessionEnd: () => dlPush("session_end"),
  sessionDuration: (duration_sec: number) =>
    dlPush("session_duration", { duration_sec: Number(duration_sec) }),
  homeView: () => dlPush("home_view"),
  contentsClick: (content_id: string) =>
    dlPush("contents_click", { content_id }),
  contentsApply: (content_id: string) =>
    dlPush("contents_apply", { content_id }),
  eventCreate: (event_id: string) => dlPush("event_create", { event_id }),
  eventCreateCancel: (event_id: string) =>
    dlPush("event_create_cancel", { event_id }),
  eventComplete: (event_id: string) => dlPush("event_complete", { event_id }),
  mypageView: () => dlPush("mypage_view"),
  ticketClick: () => dlPush("ticket_click"),
  profileView: () => dlPush("profile_view"),
};
