import { apiClient } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

export type UserInfo = {
  email: string;
  phoneNumber: string;
  username: string;
  profileImage: string;
};

const fetchUserInfo = async (): Promise<UserInfo> => {
  const { data } = await apiClient.get("/api/auth/user");
  return data.result;
};

export const useUserInfo = () => {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo,
  });
};
