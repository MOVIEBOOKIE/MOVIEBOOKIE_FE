export const sendAuthCodeToServer = async (
  code: string,
  redirectUri: string,
  isLocal: boolean,
) => {
  const requestUrl = `http://localhost:3000/api/auth/login/kakao?code=${encodeURIComponent(
    code,
  )}&redirectUri=${encodeURIComponent(redirectUri)}&isLocal=${isLocal}`;

  try {
    const response = await fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "서버 요청이 실패했습니다.");
    }

    const data = await response.json();
    console.log("서버 응답 데이터:", data);
    return data;
  } catch (error: any) {
    console.error("Error sending auth code to server:", error.message);
    throw new Error("Failed to send auth code to server");
  }
};
