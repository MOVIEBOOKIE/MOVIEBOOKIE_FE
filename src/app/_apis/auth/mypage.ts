import { apiGet } from "../methods";

export interface MyPageResponse {
  profileImage: string;
  username: string;
  userTypeTitle: string;
  certificationEmail: string;
  hostExperienceCount: number;
  participationExperienceCount: number;
}

export const getMyPageInfo = () => {
  return apiGet<MyPageResponse>("/mypage");
};
