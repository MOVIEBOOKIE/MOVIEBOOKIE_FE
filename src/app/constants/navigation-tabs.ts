import { HomeIcon, EventIcon, MyIcon } from "@/icons";
import { PATHS } from "./paths";

export const navigationTabs = [
  { id: "home", label: "홈", path: PATHS.HOME, Icon: HomeIcon },
  { id: "event", label: "이벤트", path: PATHS.EVENT, Icon: EventIcon },
  { id: "mypage", label: "마이", path: PATHS.MYPAGE, Icon: MyIcon },
] as const;
