export const apiRequest = async (
  url: string,
  method: "GET" | "POST" = "GET",
  body?: Record<string, any>,
) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      ...(body && { body: JSON.stringify(body) }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "서버 요청이 실패했습니다.");
    }

    return await response.json();
  } catch (error: any) {
    console.error("API 요청 에러:", error.message);
    throw new Error(error.message || "서버 에러가 발생했습니다.");
  }
};
