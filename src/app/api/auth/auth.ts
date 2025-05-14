import { apiRequest } from "@/utils/api";

export const sendAuthCodeToServer = async (
  code: string,
  redirectUri: string,
  isLocal: boolean,
) => {
  const requestUrl = `/api/auth/login/kakao?code=${encodeURIComponent(
    code,
  )}&redirectUri=${encodeURIComponent(redirectUri)}&isLocal=${isLocal}`;

  return apiRequest(requestUrl);
};
