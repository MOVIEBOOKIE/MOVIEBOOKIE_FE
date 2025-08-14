import { EventCard } from "app/_types/card";
import { apiGet } from "../methods";

type EventType = 0 | 1 | 2;

type Params = {
  type: EventType;
  page: number;
  size: number;
};

async function fetchList(path: string, params: Params): Promise<EventCard[]> {
  try {
    const res = await apiGet<unknown>(path, params);
    return Array.isArray(res) ? (res as EventCard[]) : [];
  } catch {
    return [];
  }
}

export const getRegisteredEvents = (params: Params) =>
  fetchList("/participation/registered", params);

export const getHostedEvents = (params: Params) =>
  fetchList("/participation/hosted", params);

export async function checkRecruitable(date: string): Promise<boolean> {
  const res = await apiGet<string>("/participation/recruitable", { date });
  return String(res).trim().toUpperCase() === "TRUE";
}
