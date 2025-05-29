import { TOGGLE_TO_TYPE, ToggleLabel } from "@/constants/event-tab";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  getHostedEvents,
  getRegisteredEvents,
} from "app/_apis/events/participation";

export function useInfiniteEventTabQuery(
  type: "신청 목록" | "내 이벤트",
  selectedToggle: ToggleLabel,
) {
  const queryFn = type === "신청 목록" ? getRegisteredEvents : getHostedEvents;

  return useInfiniteQuery({
    queryKey: [type, selectedToggle, "infinite"],
    queryFn: ({ pageParam = 0 }) =>
      queryFn({
        type: TOGGLE_TO_TYPE[selectedToggle],
        page: pageParam,
        size: 10,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < 10) {
        return undefined;
      }
      return allPages.length;
    },
    initialPageParam: 0,
    staleTime: 0,
    refetchOnMount: true,
  });
}
