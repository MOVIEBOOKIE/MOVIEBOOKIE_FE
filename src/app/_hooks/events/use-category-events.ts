import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getEventsByCategory } from "app/_apis/events/category";

export const useCategoryEvents = (category: string) => {
  return useInfiniteQuery({
    queryKey: ["category-events", category],
    queryFn: ({ pageParam = 0 }) =>
      getEventsByCategory(category, pageParam, 10),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || !lastPage.eventList) return undefined;
      return lastPage.eventList.length === 10 ? allPages.length : undefined;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!category,
  });
};

export const useCategoryPageEvents = (
  category: string,
  page: number,
  size: number = 10,
) => {
  return useQuery({
    queryKey: ["category-page-events", category, page],
    queryFn: () => getEventsByCategory(category, page, size),
    staleTime: 1000 * 60 * 5,
  });
};
