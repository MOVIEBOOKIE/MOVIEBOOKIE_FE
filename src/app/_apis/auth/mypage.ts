import { apiGet } from "../methods";

export interface MyPageResponse {
  profileImage: string;
  username: string;
  userType: string;
  certificationEmail: string;
  hostExperienceCount: number;
  participationExperienceCount: number;
}

export const getMyPageInfo = () => {
  return apiGet<MyPageResponse>("/mypage");
};
