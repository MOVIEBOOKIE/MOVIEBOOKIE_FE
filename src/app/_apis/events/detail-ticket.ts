import { apiGet } from "../methods";

export const fetchTickets = (page = 0, size = 10) => {
  return apiGet<any[]>("/tickets", { page, size });
};
