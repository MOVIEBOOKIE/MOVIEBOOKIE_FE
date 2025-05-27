import { END_POINTS } from "@/constants/api";
import { apiGet } from "../methods";
import { ToTicketResponse } from "app/_types/ticket";

export const getToTicket = (eventId: number) => {
  return apiGet<ToTicketResponse>(END_POINTS.GET_TO_TICKET(eventId));
};
