import { PATHS } from "./paths";

export const NAVIGATION_TABS = [
  { id: "home", label: "홈", path: PATHS.HOME },
  { id: "event", label: "이벤트", path: PATHS.EVENT },
  { id: "mypage", label: "마이", path: PATHS.MYPAGE },
] as const;
