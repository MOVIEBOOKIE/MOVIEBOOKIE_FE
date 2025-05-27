import { apiPost } from "./methods";

export const postNotificationToken = async (token: string) => {
  return await apiPost("/notifications/register-token", { token });
};
