import { useInfiniteQuery } from "@tanstack/react-query";
import {
  getHostedEvents,
  getRegisteredEvents,
} from "app/_apis/events/participation";
import { TOGGLE_TO_TYPE, ToggleLabel } from "@/constants/event-tab";
import { EventCard } from "app/_types/card";

export function useInfiniteEventTabQuery(
  type: "신청 목록" | "내 이벤트",
  selectedToggle: ToggleLabel,
  toggleParam?: string,
) {
  const fetcher = type === "신청 목록" ? getRegisteredEvents : getHostedEvents;
  const isConfirmed = toggleParam === "confirmed";

  return useInfiniteQuery<EventCard[], Error>({
    queryKey: [type, selectedToggle, isConfirmed, "infinite"],
    queryFn: ({ pageParam = 0 }) =>
      fetcher({
        type: TOGGLE_TO_TYPE[selectedToggle],
        page: pageParam as number,
        size: 10,
        ...(isConfirmed ? { confirmed: true } : {}),
      }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 10 ? allPages.length : undefined,
    initialPageParam: 0,
  });
}
