"use client";

import { useQuery } from "@tanstack/react-query";
import { apiGet } from "../_apis/methods";
export interface UserInfo {
  username: string;
  email: string;
  phoneNumber: string;
  profileImage: string | null;
}
export const useUserInfo = () => {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: () => apiGet<UserInfo>("/auth/user"),
    staleTime: 1000 * 60 * 5,
  });
};
