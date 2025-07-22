import axios from "axios";

export const registerFCMToken = async (token: string) => {
  try {
    const res = await axios.post(
      "/api/notifications/register-token",
      { token },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    console.log("✅ 토큰 등록 응답:", res.data);
    return res.data;
  } catch (err: any) {
    console.error("❌ axios 요청 실패:", err.message);

    throw err;
  }
};
