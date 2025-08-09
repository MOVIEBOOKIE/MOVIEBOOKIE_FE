import { useInfiniteQuery } from "@tanstack/react-query";
import {
  getHostedEvents,
  getRegisteredEvents,
} from "app/_apis/events/participation";
import { EventCard } from "app/_types/card";

type TabKind = "apply" | "host";
type EventTypeNum = 0 | 1 | 2;

interface UseEventTabParams {
  tab: TabKind; // "apply": 신청 목록 / "host": 주최 목록
  toggle: EventTypeNum; // 0 모집 | 1 대관 | 2 취소
  pageSize?: number;
}

async function fetchEvents(
  tab: TabKind,
  toggle: EventTypeNum,
  page: number,
  size: number,
) {
  const fetcher = tab === "apply" ? getRegisteredEvents : getHostedEvents;
  return fetcher({ type: toggle, page, size });
}

export function useInfiniteEventTabQuery({
  tab,
  toggle,
  pageSize = 10,
}: UseEventTabParams) {
  return useInfiniteQuery<EventCard[], Error>({
    queryKey: ["eventTab", tab, toggle, pageSize],
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) =>
      fetchEvents(tab, toggle, Number(pageParam), pageSize),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === pageSize ? allPages.length : undefined,
  });
}
