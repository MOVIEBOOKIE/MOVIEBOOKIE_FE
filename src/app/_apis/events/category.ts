import { EventCard } from "app/_types/card";
import { AxiosRequestConfig } from "axios";
import { apiGet } from "../methods";
import { devError } from "@/utils/dev-logger";

interface CategoryEventsResult {
  totalPages: number;
  eventList: EventCard[];
}

const normalizeCategoryEvents = (
  res: Partial<CategoryEventsResult> | undefined,
): CategoryEventsResult => ({
  totalPages: res?.totalPages ?? 0,
  eventList: res?.eventList ?? [],
});

export const fetchEventsByCategory = async (
  category: string,
  page = 0,
  size = 10,
  config?: AxiosRequestConfig,
): Promise<CategoryEventsResult> => {
  const res = await apiGet<CategoryEventsResult>(
    "/events/category",
    {
      category,
      page,
      size,
    },
    config,
  );

  return normalizeCategoryEvents(res);
};

export const getEventsByCategory = async (
  category: string,
  page = 0,
  size = 10,
  config?: AxiosRequestConfig,
): Promise<CategoryEventsResult> => {
  try {
    return await fetchEventsByCategory(category, page, size, config);
  } catch (error) {
    devError("카테고리 이벤트 요청 실패:", error);
    return {
      totalPages: 0,
      eventList: [],
    };
  }
};
