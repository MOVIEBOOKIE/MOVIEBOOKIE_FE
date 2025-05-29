"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PATHS } from "@/constants";
import Loading from "app/loading";
import { useKakaoLogin } from "app/_hooks/onboarding/use-kakao-login";

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
    <Suspense fallback={<Loading />}>
      <KakaoLogin />
    </Suspense>
  );
}
function KakaoLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const { redirectUrl, isLocal } = getRedirectUrl();
  const { mutateAsync: kakaoLogin, isPending } = useKakaoLogin();

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

        const { success, message, data } = response;
        console.log(data);
        if (success) {
          // if (!data?.userType) {
          //   router.push(PATHS.AGREEMENT);
          // } else {
          //   router.push(PATHS.HOME);
          // }
          router.push(PATHS.TRAIT);
        } else {
          router.push(`/login?error=${encodeURIComponent(message)}`);
        }
      } catch (error: any) {
        router.push(`/login?error=${encodeURIComponent(error.message)}`);
      }
    };
    handleLogin();
  }, [code, redirectUrl, isLocal, router]);

  return isPending ? <Loading /> : null;
}
