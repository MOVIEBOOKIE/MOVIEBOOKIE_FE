import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const sendAuthCodeToServer = async ({
  code,
  redirectUri,
  isLocal,
}: {
  code: string;
  redirectUri: string;
  isLocal: boolean;
}) => {
  const response = await axios.get("/api/auth/login/kakao", {
    params: { code, redirectUri, isLocal },
    withCredentials: true,
  });
  return response.data;
};
export const useKakaoLogin = () => {
  return useMutation({
    mutationFn: sendAuthCodeToServer,
  });
};
