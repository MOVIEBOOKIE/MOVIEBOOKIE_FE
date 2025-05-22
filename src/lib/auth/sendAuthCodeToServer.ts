import axios from "axios";

export const sendAuthCodeToServer = async (
  code: string,
  redirectUri: string,
  isLocal: boolean,
) => {
  try {
    const response = await axios.get("/api/auth/login/kakao", {
      params: { code, redirectUri, isLocal },
      withCredentials: true,
    });

    console.log("API 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("API 요청 중 에러:", error);
    throw error;
  }
};
