import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EVENT_KEY, EVENT_OPTION } from "app/_apis/events/event-queries";
import { postEventsRegister } from "app/_apis/events/events";

export const useGetEvent = (eventId: number) => {
  return useQuery(EVENT_OPTION.EVENT(eventId));
};

export const usePostEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (eventId: number) => postEventsRegister(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EVENT_KEY.EVENT() });
    },
  });
};
