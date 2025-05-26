import { useInfiniteQuery } from "@tanstack/react-query";
import { getEventsByCategory } from "app/_apis/events/category";

export const useCategoryEvents = (category: string) => {
  return useInfiniteQuery({
    queryKey: ["category-events", category],
    queryFn: ({ pageParam = 0 }) =>
      getEventsByCategory(category, pageParam, 10),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 10 ? allPages.length : undefined,

    staleTime: 1000 * 60 * 10,
    enabled: !!category,
  });
};
