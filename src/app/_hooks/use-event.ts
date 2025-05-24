import { useQuery } from "@tanstack/react-query";
import { EVENT_OPTION } from "app/_apis/\bevent/use-event-querise";

export const useGetEvent = (eventId: number) => {
  return useQuery(EVENT_OPTION.EVENT(eventId));
};
