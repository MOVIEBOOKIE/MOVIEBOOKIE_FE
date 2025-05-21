import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/utils/axios";

export const useReissueToken = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await apiClient.post("/api/auth/reissue");
      return res.data;
    },
  });
};
