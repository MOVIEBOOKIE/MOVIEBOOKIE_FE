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
export interface CardProps {
  id?: string;
  imageUrl: string;
  category?: string;
  title: string;
  placeAndDate: string;
  description?: string;
  ddayBadge?: string | null;
  statusBadge?: string;
  progressRate?: string;
  estimatedPrice?: number | string;
}
