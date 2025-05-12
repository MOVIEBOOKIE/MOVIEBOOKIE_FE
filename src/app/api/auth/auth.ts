import { apiRequest } from "@/utils/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const sendAuthCodeToServer = async (
  code: string,
  redirectUri: string,
  isLocal: boolean,
) => {
  const requestUrl = `${API_BASE_URL}/api/auth/login/kakao?code=${encodeURIComponent(
    code,
  )}&redirectUri=${encodeURIComponent(redirectUri)}&isLocal=${isLocal}`;

  return apiRequest(requestUrl);
};
