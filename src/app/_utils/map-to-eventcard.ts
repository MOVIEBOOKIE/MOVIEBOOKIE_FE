export function mapEventCardToCardProps(event: any) {
  return {
    eventId: event.eventId,
    mediaType: event.mediaType,
    mediaTitle: event.mediaTitle,
    rate: event.rate,
    imageUrl: event.imageUrl,
    category: event.category,
    title: event.title,
    placeAndDate: event.placeAndDate,
    description: event.description,
    ddayBadge: event.ddayBadge,
    statusBadge: event.statusBadge,
    progressRate: event.progressRate,
    estimatedPrice: event.estimatedPrice,
  };
}
