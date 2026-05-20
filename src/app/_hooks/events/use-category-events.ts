import { queryOptions, useQuery } from "@tanstack/react-query";
import type { AxiosRequestConfig } from "axios";
import {
  fetchEventsByCategory,
  getEventsByCategory,
} from "app/_apis/events/category";

export const categoryEventsQueryKey = (category: string) =>
  ["category-events", category] as const;

export const categoryEventsQueryOptions = (
  category: string,
  config?: AxiosRequestConfig,
  options?: {
    strict?: boolean;
  },
) =>
  queryOptions({
    queryKey: categoryEventsQueryKey(category),
    queryFn: () =>
      options?.strict
        ? fetchEventsByCategory(category, 0, 10, config)
        : getEventsByCategory(category, 0, 10, config),
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
    enabled: Boolean(category) && (options?.enabled ?? true),
  });
};

export const useCategoryPageEvents = (
  category: string,
  page: number,
  size: number = 10,
) => {
  return useQuery({
    queryKey: ["category-page-events", category, page, size],
    queryFn: () => getEventsByCategory(category, page, size),
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(category),
  });
};
