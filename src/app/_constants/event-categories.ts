import { PATH_IMAGES } from "./path-images";
import { PATHS } from "./paths";

export const EVENT_CATEGORIES = [
  {
    label: "인기 \n 이벤트",
    src: PATH_IMAGES.SEARCH.POPULAR,
    path: PATHS.CATEGORY.POPULAR,
  },
  {
    label: "최근  \n 이벤트",
    src: PATH_IMAGES.SEARCH.RECENT,
    path: PATHS.CATEGORY.RECENT,
  },
  {
    label: "레전드 드라마\n같이 보기",
    src: PATH_IMAGES.SEARCH.DRAMA,
    path: PATHS.CATEGORY.DRAMA,
  },
  {
    label: "명작 영화\n다시보기",
    src: PATH_IMAGES.SEARCH.MOVIE,
    path: PATHS.CATEGORY.MOVIE,
  },
];
