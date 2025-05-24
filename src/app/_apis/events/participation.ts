import { EventCard } from "app/_types/card";
import { apiGet } from "../methods";

export const getRegisteredEvents = (params: {
  type: 0 | 1;
  page: number;
  size: number;
}) => apiGet<EventCard[]>("/participation/registered", params);

export const getHostedEvents = (params: {
  type: 0 | 1;
  page: number;
  size: number;
}) => apiGet<EventCard[]>("/participation/hosted", params);
