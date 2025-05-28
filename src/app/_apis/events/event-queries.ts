import { queryOptions, UseQueryOptions } from "@tanstack/react-query";
import { getEvents, GetEventsSearch } from "./events";
import { EventSearchParams } from "app/_types/event";

export const EVENT_KEY = {
  EVENT: () => ["event"],
  SEARCH: (params: EventSearchParams) => ["event-search", params],
} as const;

export const EVENT_OPTION = {
  EVENT: (eventId: number) =>
    queryOptions({
      queryKey: EVENT_KEY.EVENT(),
      queryFn: () => getEvents(eventId),
    }),
  SEARCH: (params: EventSearchParams) =>
    queryOptions({
      queryKey: EVENT_KEY.SEARCH(params),
      queryFn: () => GetEventsSearch(params),
    }),
};
