import { EventCard } from "app/_types/card";
import { apiGet } from "../methods";

export const getEventsByCategory = async (
  category: string,
  page = 0,
  size = 10,
): Promise<EventCard[]> => {
  return apiGet<EventCard[]>("/events/category", { category, page, size });
};
