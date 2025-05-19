export const sendAuthCodeToServer = async (
  code: string,
  redirectUri: string,
  isLocal: boolean,
) => {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://api.movie-bookie.shop"
      : "http://localhost:3000";

  const requestUrl = `https://api.movie-bookie.shop/api/auth/login/kakao?code=${encodeURIComponent(
    code,
  )}&redirectUri=${encodeURIComponent(redirectUri)}&isLocal=${isLocal}`;
  console.log("실제 fetch 요청 주소:", requestUrl);

  try {
    const res = await fetch(requestUrl, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`API 요청 실패: ${res.status} - ${errorText}`);
    }

    return res.json();
  } catch (error) {
    console.error("API 요청 중 에러:", error);
    throw error;
  }
};
