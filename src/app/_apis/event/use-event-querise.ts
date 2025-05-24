import { queryOptions } from "@tanstack/react-query";
import { getEvents } from "./event";

export const EVENT_KEY = {
  EVENT: () => ["event"],
} as const;

export const EVENT_OPTION = {
  EVENT: (eventId: number) =>
    queryOptions({
      queryKey: EVENT_KEY.EVENT(),
      queryFn: () => getEvents(eventId),
    }),
};
