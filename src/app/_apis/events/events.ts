import { END_POINTS } from "@/constants/api";
import { apiDelete, apiGet, apiPost } from "../methods";
import { EventData } from "app/_types/event";

export const getEvents = (eventId: number) => {
  return apiGet<EventData>(END_POINTS.GET_EVENT(eventId));
};

export const postEventsRegister = (eventId: number) => {
  return apiPost(END_POINTS.EVENT_REGISTER(eventId));
};

export const DeleteEventsRegister = (eventId: number) => {
  return apiDelete(END_POINTS.EVENT_REGISTER(eventId));
};
