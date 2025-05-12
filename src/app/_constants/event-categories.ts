import { PATHS } from "./paths";

export const IMAGE_PATHS = {
  POPULAR: "/images/popular.png",
  RECENT: "/images/recent.png",
  DRAMA: "/images/drama.png",
  MOVIE: "/images/movie.png",
};

export const EVENT_CATEGORIES = [
  {
    label: "인기 이벤트",
    src: IMAGE_PATHS.POPULAR,
    path: PATHS.CATEGORY.POPULAR,
  },
  {
    label: "최근 이벤트",
    src: IMAGE_PATHS.RECENT,
    path: PATHS.CATEGORY.RECENT,
  },
  {
    label: "드라마 최종회\n같이 보기",
    src: IMAGE_PATHS.DRAMA,
    path: PATHS.CATEGORY.DRAMA,
  },
  {
    label: "명작 영화\n다시보기",
    src: IMAGE_PATHS.MOVIE,
    path: PATHS.CATEGORY.MOVIE,
  },
];
