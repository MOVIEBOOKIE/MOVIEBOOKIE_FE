export interface ToTicketResponse {
  ticketId: number;
}

export interface TicketResponse {
  ticketId: number;
  title: string;
  type: string;
  location: string;
  price: number;
  hostName: string;
  participants: number;
  time: string;
  scheduledAt: string;
  address: string;
  eventImageUrl: string;
}
