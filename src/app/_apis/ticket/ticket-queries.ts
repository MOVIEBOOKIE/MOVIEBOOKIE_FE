import { queryOptions } from "@tanstack/react-query";
import { getToTicket } from "./ticket";

export const TICKET_KEY = {
  TICKET: () => ["ticket"],
} as const;

export const TICKET_OPTION = {
  TICKET: (eventId: number) =>
    queryOptions({
      queryKey: TICKET_KEY.TICKET(),
      queryFn: () => getToTicket(eventId),
    }),
};
