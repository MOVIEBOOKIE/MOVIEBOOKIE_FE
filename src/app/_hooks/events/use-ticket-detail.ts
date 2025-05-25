import { useQuery } from "@tanstack/react-query";
import { apiGet } from "app/_apis/methods";

export const useTicketDetail = (ticketId: string | null) => {
  return useQuery({
    queryKey: ["ticket", ticketId],
    queryFn: () => apiGet(`/tickets/${ticketId}`),
    enabled: !!ticketId,
  });
};
