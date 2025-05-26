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
  const res = await apiGet<CategoryEventsResult>("/events/category", {
    category,
    page,
    size,
  });

  return {
    totalPages: res.totalPages ?? 0,
    eventList: res.eventList ?? [],
  };
};
