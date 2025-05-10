import { PATHS } from "./paths";

export const EVENT_CATEGORIES = [
  {
    label: "인기 이벤트",
    src: "/images/popular.png",
    path: PATHS.CATEGORY.POPULAR,
  },
  {
    label: "최근 이벤트",
    src: "/images/recent.png",
    path: PATHS.CATEGORY.RECENT,
  },
  {
    label: "드라마 최종회/n같이 보기",
    src: "/images/drama.png",
    path: PATHS.CATEGORY.DRAMA,
  },
  {
    label: "명작 영화/n다시보기",
    src: "/images/movie.png",
    path: PATHS.CATEGORY.MOVIE,
  },
] as const;
