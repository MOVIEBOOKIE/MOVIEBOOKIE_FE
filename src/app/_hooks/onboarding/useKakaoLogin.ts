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
    onSuccess: (data) => {
      console.log("로그인 성공", data);
    },
    onError: (error) => {
      console.error("로그인 실패", error);
    },
  });
};
