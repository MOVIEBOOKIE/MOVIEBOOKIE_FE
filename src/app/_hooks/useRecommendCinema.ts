import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/utils/axios";

export const useRecommendedCinemas = (body: {
  min: number;
  max: number;
  mediaType: string;
  startTime: string;
  progressTime: number;
}) => {
  return useQuery({
    queryKey: ["recommended-cinemas", body],
    queryFn: async () => {
      const res = await apiClient.post("/api/locations", body);
      return res.data.data;
    },
    enabled: !!body.mediaType && !!body.startTime && body.progressTime > 0,
  });
};
