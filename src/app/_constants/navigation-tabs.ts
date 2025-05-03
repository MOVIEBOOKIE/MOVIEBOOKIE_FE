import { PATHS } from "./paths";
import { HomeIcon, EventIcon, MyIcon, NotificationIcon } from "@/icons/index";

export const NAVIGATION_TABS = [
  { id: "home", label: "홈", path: PATHS.HOME, Icon: HomeIcon },
  { id: "event", label: "이벤트", path: PATHS.EVENT, Icon: EventIcon },
  {
    id: "notifications",
    label: "알림",
    path: PATHS.NOTIFICATIONS,
    Icon: NotificationIcon,
  },
  { id: "mypage", label: "마이", path: PATHS.MYPAGE, Icon: MyIcon },
] as const;
