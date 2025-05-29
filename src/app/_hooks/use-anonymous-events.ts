import { useQuery } from "@tanstack/react-query";
import { apiGet } from "app/_apis/methods";

export const useGetAnonymousEvent = (
  eventId: number,
  p0?: { enabled: boolean },
) => {
  return useQuery({
    queryKey: ["anonymousEvent", eventId],
    queryFn: () => apiGet(`/events/anonymous/${eventId}`),
    enabled: !!eventId,
  });
};
