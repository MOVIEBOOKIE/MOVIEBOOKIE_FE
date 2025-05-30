import { useQuery } from "@tanstack/react-query";
import { apiGet } from "app/_apis/methods";
import { TicketResponse } from "app/_types/ticket";

export const useTicketDetail = (ticketId: number, p0: { enabled: boolean }) => {
  return useQuery({
    queryKey: ["ticket", ticketId],
    queryFn: () => apiGet<TicketResponse>(`/tickets/${ticketId}`),
    enabled: !!ticketId,
  });
};
