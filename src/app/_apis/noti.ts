import { devLog } from "@/utils/dev-logger";
import { apiPost } from "./methods";

export const postNotificationToken = async (token: string) => {
  console.log("🚀 FCM 토큰 전송 시작:", token);

  try {
    const res = await apiPost("/notifications/register-token", { token });
    console.log("✅ FCM 토큰 전송 성공:", res);
    devLog("✅ FCM 토큰 전송 성공:", res);
    return res;
  } catch (error) {
    console.error("❌ FCM 토큰 전송 실패:", error);
    throw error;
  }
};
