import { PATHS } from "./paths";

export const EVENT_CATEGORIES = [
  {
    label: "인기 이벤트",
    src: "/popular.png",
    path: PATHS.CATEGORY.POPULAR,
  },
  {
    label: "최근 이벤트",
    src: "/recent.png",
    path: PATHS.CATEGORY.RECENT,
  },
  {
    label: "드라마 최종회/n같이 보기",
    src: "/drama.png",
    path: PATHS.CATEGORY.DRAMA,
  },
  {
    label: "명작 영화/n다시보기",
    src: "/movie.png",
    path: PATHS.CATEGORY.MOVIE,
  },
] as const;
