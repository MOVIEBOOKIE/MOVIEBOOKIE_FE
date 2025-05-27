import { END_POINTS } from "@/constants/api";
import { apiDelete, apiGet, apiPost } from "../methods";
import {
  EventData,
  EventSearchParams,
  GetEventSearchResponse,
  PostEventsVenueParams,
} from "app/_types/event";

export const getEvents = (eventId: number) => {
  return apiGet<EventData>(END_POINTS.GET_EVENT(eventId));
};

export const postEventsRegister = (eventId: number) => {
  return apiPost(END_POINTS.EVENT_REGISTER(eventId));
};

export const DeleteEventsRegister = (eventId: number) => {
  return apiDelete(END_POINTS.EVENT_REGISTER(eventId));
};

export const DeleteEventsRecruit = (eventId: number) => {
  return apiDelete(END_POINTS.DELETE_EVENT_RECRUIT(eventId));
};

export const PostEventsVenue = ({ eventId, type }: PostEventsVenueParams) => {
  return apiPost(END_POINTS.POST_EVENT_VENUE(eventId), null, {
    params: { type },
  });
};

export const GetEventsSearch = (params: EventSearchParams) => {
  return apiGet<GetEventSearchResponse[]>(END_POINTS.GET_EVENT_SEARCH, params);
};
