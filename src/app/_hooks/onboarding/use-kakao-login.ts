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
  try {
    const response = await axios.get("/api/auth/login/kakao", {
      params: { code, redirectUri, isLocal },
      withCredentials: true,
    });
    console.log("로그인 성공 응답:", response.data);

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error(
      " 로그인 에러:",
      error.response?.status,
      error.response?.data,
    );

    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error.message ||
        "로그인 중 오류가 발생했습니다.",
    };
  }
};

export const useKakaoLogin = () => {
  return useMutation({
    mutationFn: sendAuthCodeToServer,
  });
};
