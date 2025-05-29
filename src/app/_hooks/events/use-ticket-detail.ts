import { useQuery } from "@tanstack/react-query";
import { apiGet } from "app/_apis/methods";

export const useTicketDetail = (ticketId: number, p0: { enabled: boolean }) => {
  return useQuery({
    queryKey: ["ticket", ticketId],
    queryFn: () => apiGet(`/tickets/${ticketId}`),
    enabled: !!ticketId,
  });
};
