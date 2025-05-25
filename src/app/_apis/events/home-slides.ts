import { HomeEvent } from "app/_types/home-slides";
import { apiGet } from "../methods";

export const getHomeEvents = async (): Promise<HomeEvent[]> => {
  return apiGet<HomeEvent[]>("/events/home");
};
