import { END_POINTS } from "@/constants/api";
import { apiGet, apiPost } from "../methods";
import { EventData } from "app/_types/event";

export const getEvents = (eventId: number) => {
  return apiGet<EventData>(END_POINTS.GET_EVENT(eventId));
};

export const postEventsRegister = (eventId: number) => {
  return apiPost(END_POINTS.GET_EVENT_REGISTER(eventId));
};
