export const CATEGORIES = {
  인기: "popular",
  최신: "recent",
  영화: "movie",
  드라마: "drama",
  예능: "entertainment",
  스포츠: "sports",
  콘서트: "concert",
  기타: "기타",
} as const;

export type CategoryLabel = keyof typeof CATEGORIES; // "인기" | "최신" | ...
export type CategoryType = (typeof CATEGORIES)[CategoryLabel]; // "popular" | "recent" | ...

// 한글 라벨 배열
export const CATEGORY_LABELS: CategoryLabel[] = Object.keys(
  CATEGORIES,
) as CategoryLabel[];

// 역 매핑 (type ➝ label)
export const CATEGORY_TYPE_TO_LABEL: Record<CategoryType, CategoryLabel> = {
  popular: "인기",
  recent: "최신",
  movie: "영화",
  drama: "드라마",
  entertainment: "예능",
  sports: "스포츠",
  concert: "콘서트",
  기타: "기타",
};
