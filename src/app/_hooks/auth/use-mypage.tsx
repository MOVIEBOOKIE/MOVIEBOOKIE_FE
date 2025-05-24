import { useQuery } from "@tanstack/react-query";
import { getMyPageInfo } from "app/_apis/auth/mypage";

export const useMyPage = () => {
  return useQuery({
    queryKey: ["my-page"],
    queryFn: getMyPageInfo,
  });
};
