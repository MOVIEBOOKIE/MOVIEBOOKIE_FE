import { useQuery } from "@tanstack/react-query";
import { fetchTickets } from "app/_apis/events/detail-ticket";

export const useTickets = (page = 0, size = 10) => {
  return useQuery({
    queryKey: ["tickets", page, size],
    queryFn: () => fetchTickets(page, size),
    refetchOnMount: "always",
  });
};
