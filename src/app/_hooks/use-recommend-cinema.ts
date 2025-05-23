import { useQuery } from "@tanstack/react-query";
import { apiPost } from "app/_apis/methods";

interface RequestBody {
  min: number;
  max: number;
  mediaType: string;
  startTime: string;
  progressTime: number;
}

interface RecommendedCinema {
  locationId: number;
  locationName: string;
  address: string;
  locationImageUrl: string;
  locationKeywordList: string[];
  pricePerHour: number;
  seatCount: number;
  hasDisabledSeat: boolean;
}

export const useRecommendedCinemas = (body: RequestBody) => {
  return useQuery<RecommendedCinema[]>({
    queryKey: ["recommended-cinemas", body],
    queryFn: () =>
      apiPost<RecommendedCinema[], RequestBody>("/locations", body),
  });
};
