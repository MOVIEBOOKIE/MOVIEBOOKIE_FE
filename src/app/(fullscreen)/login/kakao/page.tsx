"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { sendAuthCodeToServer } from "app/api/auth/auth";

const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID as string;
const REDIRECT_URI_LOCAL = "http://localhost:3000/login/kakao";
const REDIRECT_URI_PROD = "https://api-movie-bookie.shop/login/kakao";
const isProduction = process.env.NODE_ENV === "production";
const redirectUri = isProduction ? REDIRECT_URI_PROD : REDIRECT_URI_LOCAL;
const isLocal = !isProduction;

export default function Kakao() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) {
      console.warn("인가 코드가 없습니다. 카카오 로그인 페이지로 이동합니다.");

      const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(
        redirectUri,
      )}`;

      window.location.href = kakaoAuthUrl;
      return;
    }

    console.log("인가 코드 수신됨:", code);

    const handleLogin = async () => {
      try {
        const response = await sendAuthCodeToServer(code, redirectUri, isLocal);
        const { success, data } = response;

        if (success) {
          const { email, nickname, profileImage } = data;
          console.log("로그인 성공:", { email, nickname, profileImage });
          localStorage.setItem("userProfile", JSON.stringify(data));
          router.push("/");
        } else {
          console.warn("로그인 실패:", response.message);
          router.push(`/login?error=${encodeURIComponent(response.message)}`);
        }
      } catch (error: any) {
        console.error("로그인 요청 에러:", error.message);
        router.push(`/login?error=${encodeURIComponent(error.message)}`);
      }
    };

    handleLogin();
  }, [code, router]);

  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <h1 className="text-xl text-white">로그인 중...</h1>
    </div>
  );
}
