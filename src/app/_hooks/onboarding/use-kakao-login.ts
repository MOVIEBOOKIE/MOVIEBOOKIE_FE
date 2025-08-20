import { devLog } from "@/utils/dev-logger";
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
    console.log("📡 서버로 요청 보내기", {
      endpoint: "/api/auth/login/kakao",
      params: { code, redirectUri, isLocal },
      withCredentials: true,
      time: new Date().toISOString(),
    });

    const response = await axios.get("/api/auth/login/kakao", {
      params: { code, redirectUri, isLocal },
      withCredentials: true,
    });

    console.log("⬅️ 서버 응답 수신", {
      status: response.status,
      headers: response.headers,
      data: response.data,
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error("❌ 서버 요청 에러 발생", {
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
