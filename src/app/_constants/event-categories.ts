import { PATH_IMAGES } from "./path-images";
import { PATHS } from "./paths";

export const EVENT_CATEGORIES = [
  {
    label: "인기 이벤트",
    src: PATH_IMAGES.POPULAR,
    path: PATHS.CATEGORY.POPULAR,
  },
  {
    label: "최근 이벤트",
    src: PATH_IMAGES.RECENT,
    path: PATHS.CATEGORY.RECENT,
  },
  {
    label: "드라마 최종회\n같이 보기",
    src: PATH_IMAGES.DRAMA,
    path: PATHS.CATEGORY.DRAMA,
  },
  {
    label: "명작 영화\n다시보기",
    src: PATH_IMAGES.MOVIE,
    path: PATHS.CATEGORY.MOVIE,
  },
];
