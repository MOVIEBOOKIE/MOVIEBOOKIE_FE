export interface EventCard {
  eventId: number;
  mediaType: string;
  mediaTitle: string;
  description: string;
  rate: number;
  estimatedPrice: number;
  eventDate: string;
  eventStatus: string;
  d_day: string | null;
  locationName: string;
  posterImageUrl: string;
}
