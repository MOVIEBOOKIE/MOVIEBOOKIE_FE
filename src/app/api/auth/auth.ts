import { apiRequest } from "@/utils/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_DEV_URL;

export const sendAuthCodeToServer = async (
  code: string,
  redirectUrl: string,
  isLocal: boolean,
) => {
  const requestUrl = `${API_BASE_URL}/api/auth/login/kakao?code=${encodeURIComponent(
    code,
  )}&redirectUrl=${encodeURIComponent(redirectUrl)}&isLocal=${isLocal}`;

  return apiRequest(requestUrl);
};
