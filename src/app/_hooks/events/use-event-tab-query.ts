import { TOGGLE_TO_TYPE, ToggleLabel } from "@/constants/event-tab";
import { useQuery } from "@tanstack/react-query";
import {
  getHostedEvents,
  getRegisteredEvents,
} from "app/_apis/events/participation";

export function useEventTabQuery(
  type: "신청 목록" | "내 이벤트",
  selectedToggle: ToggleLabel,
) {
  const queryFn = type === "신청 목록" ? getRegisteredEvents : getHostedEvents;

  const { data, isError } = useQuery({
    queryKey: [type, selectedToggle],
    queryFn: () =>
      queryFn({
        type: TOGGLE_TO_TYPE[selectedToggle],
        page: 0,
        size: 10,
      }),
    staleTime: 0,
    refetchOnMount: true,
  });

  return {
    data: data ?? [],
    isError,
  };
}
