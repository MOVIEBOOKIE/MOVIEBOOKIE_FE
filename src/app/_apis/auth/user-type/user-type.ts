import { END_POINTS } from "@/constants/api";
import { UserResponse, UserTypeData, UserTypeResponse } from "app/_types/user";
import { apiGet, apiPost } from "app/_apis/methods";

export const postUserType = (body?: UserTypeData) => {
  return apiPost(END_POINTS.POST_USER_TYPE, body);
};

export const getUserTypeResult = () => {
  return apiGet<UserTypeResponse>(END_POINTS.GET_USER_TYPE_RESULT);
};

export const getUser = () => {
  return apiGet<UserResponse>(END_POINTS.GET_USER);
};
