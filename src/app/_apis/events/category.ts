import { EventCard } from "app/_types/card";
import { apiGet } from "../methods";

interface CategoryEventsResult {
  totalPages: number;
  eventList: EventCard[];
}
export const getEventsByCategory = async (
  category: string,
  page = 0,
  size = 10,
): Promise<CategoryEventsResult> => {
  try {
    const res = await apiGet<CategoryEventsResult>("/events/category", {
      category,
      page,
      size,
    });

    return {
      totalPages: res.totalPages ?? 0,
      eventList: res.eventList ?? [],
    };
  } catch (error) {
    console.error("카테고리 이벤트 요청 실패:", error);
    return {
      totalPages: 0,
      eventList: [],
    };
  }
};
