import { useQuery } from "@tanstack/react-query";
import { EVENT_OPTION } from "app/_apis/events/event-queries";

export const useGetEvent = (eventId: number) => {
  return useQuery(EVENT_OPTION.EVENT(eventId));
};
