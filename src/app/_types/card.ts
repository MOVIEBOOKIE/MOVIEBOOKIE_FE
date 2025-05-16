export type CardData = {
  imageUrl: string | { src: string } | { default: string };
  category: string;
  title: string;
  placeAndDate: string;
  description?: string;
  ddayBadge?: string;
  statusBadge?: string;
  progressRate?: string;
  estimatedPrice?: string;
};
