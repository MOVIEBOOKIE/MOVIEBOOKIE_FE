import { queryOptions } from "@tanstack/react-query";
import { getEvents } from "./events";

export const EVENT_KEY = {
  EVENT: (eventId: number) => ["event", eventId],
} as const;

export const EVENT_OPTION = {
  EVENT: (eventId: number) =>
    queryOptions({
      queryKey: EVENT_KEY.EVENT(eventId),
      queryFn: () => getEvents(eventId),
    }),
};
