"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID as string;
const REDIRECT_URI_LOCAL =
  process.env.NODE_ENV === "production"
    ? "https://api-movie-bookie.shop/login/kakao"
    : "http://localhost:3000/login/kakao";

export default function KakaoRedirect() {
  const router = useRouter();

  useEffect(() => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI_LOCAL,
    )}`;

    console.log("카카오 로그인 URL:", kakaoAuthUrl);

    // ✅ 인가 코드 요청
    window.location.href = kakaoAuthUrl;
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <h1 className="text-xl text-white">카카오 로그인 중...</h1>
    </div>
  );
}
