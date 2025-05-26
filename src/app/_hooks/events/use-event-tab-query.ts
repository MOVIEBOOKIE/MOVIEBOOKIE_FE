import { useQuery } from "@tanstack/react-query";
import {
  getHostedEvents,
  getRegisteredEvents,
} from "app/_apis/events/participation";

const TOGGLES = {
  "모집 이벤트": 0,
  "확정 이벤트": 1,
  "신청 이벤트": 0,
} as const;
export type ToggleType = keyof typeof TOGGLES;

export function useEventTabQuery(
  type: "신청 목록" | "내 이벤트",
  selectedToggle: ToggleType,
) {
  const queryFn = type === "신청 목록" ? getRegisteredEvents : getHostedEvents;

  const { data, isError } = useQuery({
    queryKey: [type, selectedToggle],
    queryFn: () =>
      queryFn({
        type: TOGGLES[selectedToggle],
        page: 0,
        size: 10,
      }),
  });

  return {
    data: data ?? [],
    isError,
  };
}
