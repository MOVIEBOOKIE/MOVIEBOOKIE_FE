import { apiPost } from "../methods";

export const postLogout = async () => {
  return await apiPost("/auth/logout");
};
