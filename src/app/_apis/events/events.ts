import { END_POINTS } from "@/constants/api";
import { apiGet } from "../methods";
import { EventData } from "app/_types/event";

export const getEvents = (eventId: number) => {
  return apiGet<EventData>(END_POINTS.GET_EVENT(eventId));
};
