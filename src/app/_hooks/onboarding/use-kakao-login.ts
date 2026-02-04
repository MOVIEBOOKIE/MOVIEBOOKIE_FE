import { devError } from "@/utils/dev-logger";
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
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    devError("❌ 서버 요청 에러 발생", {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers,
      message: error.message,
    });

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
