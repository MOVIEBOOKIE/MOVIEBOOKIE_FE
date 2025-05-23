import { EventCard } from "app/_types/card";

export function mapToEventCard(mock: any): EventCard {
  return {
    eventId: mock.eventId ?? "",
    mediaType: mock.mediaType ?? "",
    d_day: mock.d_day ?? 0,
    posterImageUrl: mock.imageUrl,
    mediaTitle: mock.title,
    locationName: mock.placeAndDate.split(" | ")[0] ?? "",
    eventDate: mock.placeAndDate.split(" | ")[1] ?? "",
    description: mock.description,
    eventStatus: mock.statusBadge,
    rate: parseInt(mock.progressRate.replace("%", "")),
    estimatedPrice: parseInt(
      String(mock.estimatedPrice).replace(/[^0-9]/g, ""),
    ),
  };
}
