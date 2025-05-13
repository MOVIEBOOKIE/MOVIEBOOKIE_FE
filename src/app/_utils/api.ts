export async function apiRequest(url: string, options: any = {}) {
  try {
    const isRelative = url.startsWith("/");
    const baseUrl = isRelative
      ? (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000")
      : undefined;
    const finalUrl = new URL(url, baseUrl); // 상대경로 처리 추가

    if (options.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        finalUrl.searchParams.append(key, String(value));
      });
    }

    const res = await fetch(finalUrl.toString(), {
      method: options.method || "GET",
      headers: options.headers || {},
      body: options.body,
    });

    const contentType = res.headers.get("content-type") || "";

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API 응답 오류: ${text}`);
    }

    if (!contentType.includes("application/json")) {
      const text = await res.text();
      throw new Error(`응답이 JSON이 아닙니다: ${text}`);
    }

    return res.json();
  } catch (error: any) {
    console.error(" API 요청 에러:", error.message);
    throw error;
  }
}
