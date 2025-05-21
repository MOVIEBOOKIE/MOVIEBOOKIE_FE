"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PATHS } from "@/constants";
import { useKakaoLogin } from "app/_hooks/onboarding/useKakaoLogin";

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
  const { mutateAsync: kakaoLogin } = useKakaoLogin();

  useEffect(() => {
    if (!code) {
      const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUrl)}`;
      window.location.href = kakaoAuthUrl;
      return;
    }

    const handleLogin = async () => {
      try {
        const response = await kakaoLogin({
          code,
          redirectUri: redirectUrl,
          isLocal,
        });

        const { success, data, message } = response;

        if (success) {
          localStorage.setItem("userProfile", JSON.stringify(data));
          router.push(PATHS.HOME);
        } else {
          router.push(`/login?error=${encodeURIComponent(message)}`);
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
