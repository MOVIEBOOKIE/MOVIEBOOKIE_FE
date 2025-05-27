import { useQuery } from "@tanstack/react-query";
import { TICKET_OPTION } from "app/_apis/ticket/ticket-queries";

export const useGetToTicket = (eventId: number) => {
  return useQuery(TICKET_OPTION.TICKET(eventId));
};
