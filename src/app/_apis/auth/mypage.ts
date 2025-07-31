import { apiGet } from "../methods";

export interface MyPageResponse {
  profileImage: string;
  username: string;
  userTypeTitle: string;
  email: string;
  certificationEmail: string;
  hostExperienceCount: number;
  participationExperienceCount: number;
  ticketCount: number;
  phoneNumber: string;
}

export const getMyPageInfo = () => {
  return apiGet<MyPageResponse>("/mypage");
};
