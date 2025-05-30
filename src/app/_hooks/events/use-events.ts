import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { EVENT_KEY, EVENT_OPTION } from "app/_apis/events/event-queries";
import {
  DeleteEventsRecruit,
  DeleteEventsRegister,
  postEventsRegister,
  PostEventsVenue,
} from "app/_apis/events/events";
import { useToastStore } from "app/_stores/use-toast-store";
import { EventSearchParams, PostEventsVenueParams } from "app/_types/event";

export const useGetEvent = (
  eventId: number,
  options?: {
    enabled?: boolean;
    refetchInterval?: number | false | (() => number | false);
    onSuccess?: (data: any) => void;
  },
) => {
  return useQuery({
    ...EVENT_OPTION.EVENT(eventId),
    ...options,
  });
};

export const usePostEventRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (eventId: number) => postEventsRegister(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EVENT_KEY.EVENT() });
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  return useMutation({
    mutationFn: (eventId: number) => DeleteEventsRegister(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EVENT_KEY.EVENT() });
      showToast("이벤트 신청이 취소됐어요", "checkbox");
    },
  });
};

export const useDeleteEventsRecruit = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  return useMutation({
    mutationFn: (eventId: number) => DeleteEventsRecruit(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EVENT_KEY.EVENT() });
      showToast("이벤트 모집이 취소됐어요", "checkbox");
    },
  });
};

export const usePostEventsVenue = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  return useMutation({
    mutationFn: (params: PostEventsVenueParams) => PostEventsVenue(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EVENT_KEY.EVENT() });
      showToast("영화관 대관 신청이 완료됐어요", "checkbox");
    },
  });
};

export const useGetEventSearch = (
  params: EventSearchParams,
  option?: { enabled: boolean },
) => {
  return useQuery(EVENT_OPTION.SEARCH(params, option));
};
