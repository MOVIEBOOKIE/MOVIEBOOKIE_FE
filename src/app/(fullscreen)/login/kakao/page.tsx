"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { sendAuthCodeToServer } from "app/api/auth/auth";
import { PATHS } from "@/constants";

const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID as string;

const getRedirectUrl = () => {
  const isProduction = process.env.NODE_ENV === "production";
  const redirectUrl = isProduction
    ? process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI_PROD
    : process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI_LOCAL;

  return {
    redirectUrl: redirectUrl as string,
    isLocal: !isProduction,
  };
};

export default function Kakao() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <KakaoLogin />
    </Suspense>
  );
}

function KakaoLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const { redirectUrl, isLocal } = getRedirectUrl();

  useEffect(() => {
    console.log("ENV 확인 👇");
    console.log("NODE_ENV:", process.env.NODE_ENV);
    console.log(
      "NEXT_PUBLIC_KAKAO_CLIENT_ID:",
      process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
    );
    console.log(
      "NEXT_PUBLIC_KAKAO_REDIRECT_URI_LOCAL:",
      process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI_LOCAL,
    );
    console.log(
      "NEXT_PUBLIC_KAKAO_REDIRECT_URI_PROD:",
      process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI_PROD,
    );

    if (!code) {
      //TODO: 토스트 변경
      console.warn("인가 코드가 없습니다. 카카오 로그인 페이지로 이동합니다.");

      const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(
        redirectUrl,
      )}`;

      window.location.href = kakaoAuthUrl;
      return;
    }

    if (process.env.NODE_ENV === "development") {
      console.log("인가코드 수신됨:", code);
    }
    const handleLogin = async () => {
      try {
        const response = await sendAuthCodeToServer(code, redirectUrl, isLocal);
        const { success, data } = response;

        if (success) {
          localStorage.setItem("userProfile", JSON.stringify(data));
          router.push(PATHS.HOME);
        } else {
          router.push(`/login?error=${encodeURIComponent(response.message)}`);
        }
      } catch (error: any) {
        router.push(`/login?error=${encodeURIComponent(error.message)}`);
      }
    };

    handleLogin();
  }, [code, redirectUrl, isLocal, router]);

  return (
    <div className="bg-gray-black flex h-screen items-center justify-center">
      <h1 className="text-xl text-white">로그인 중...</h1>
    </div>
  );
}
