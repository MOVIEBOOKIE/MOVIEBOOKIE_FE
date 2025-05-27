import { useQuery } from "@tanstack/react-query";
import { getEventsByCategory } from "app/_apis/events/category";

export const useCategoryEvents = (category: string) => {
  return useQuery({
    queryKey: ["category-events", category],
    queryFn: () => getEventsByCategory(category, 0, 5),
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
