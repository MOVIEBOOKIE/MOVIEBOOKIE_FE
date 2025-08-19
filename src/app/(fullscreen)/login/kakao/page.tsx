"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PATHS } from "@/constants";
import Loading from "app/loading";
import { useKakaoLogin } from "app/_hooks/onboarding/use-kakao-login";

const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID as string;

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
  const { mutateAsync: kakaoLogin, isPending } = useKakaoLogin();

  useEffect(() => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const redirectUrl = `${origin}/login/kakao`;

    if (!code) {
      const kakaoAuthUrl =
        `https://kauth.kakao.com/oauth/authorize` +
        `?response_type=code` +
        `&client_id=${KAKAO_CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`;
      window.location.href = kakaoAuthUrl;
      return;
    }

    const handleLogin = async () => {
      try {
        const response = await kakaoLogin({
          code,
          redirectUri: redirectUrl,
          isLocal: origin.includes("localhost"),
        });

        const ok =
          response?.success &&
          typeof response?.data?.data?.userType === "string" &&
          response.data.data.userType.length > 0;

        router.push(ok ? PATHS.HOME : PATHS.AGREEMENT);
      } catch (error: any) {
        router.push(
          `/login?error=${encodeURIComponent(error?.message || "Login failed")}`,
        );
      }
    };

    handleLogin();
  }, [code, kakaoLogin, router]);

  return isPending ? <Loading /> : null;
}
