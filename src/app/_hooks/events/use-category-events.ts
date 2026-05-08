import { queryOptions, useQuery } from "@tanstack/react-query";
import type { AxiosRequestConfig } from "axios";
import { getEventsByCategory } from "app/_apis/events/category";

export const categoryEventsQueryOptions = (
  category: string,
  config?: AxiosRequestConfig,
) =>
  queryOptions({
    queryKey: ["category-events", category],
    queryFn: () => getEventsByCategory(category, 0, 10, config),
    staleTime: 1000 * 60,
  });

export const useCategoryEvents = (
  category: string,
  options?: {
    enabled?: boolean;
  },
) => {
  return useQuery({
    ...categoryEventsQueryOptions(category),
    ...options, // enabled 등 외부 옵션 허용
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
