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

    console.log("📱 KakaoLogin 디버그", {
      origin,
      redirectUrl,
      code,
      userAgent: navigator.userAgent,
      time: new Date().toISOString(),
    });

    if (!code) {
      const origin = window.location.origin;
      const redirectUrl = `${origin}/login/kakao`;
      const kakaoAuthUrl =
        `https://kauth.kakao.com/oauth/authorize` +
        `?response_type=code` +
        `&client_id=${KAKAO_CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`;

      console.log("🔗 카카오 로그인 이동 URL:", kakaoAuthUrl);

      window.location.replace(kakaoAuthUrl);
      return;
    }
    const handleLogin = async () => {
      try {
        console.log("🚀 로그인 시도 시작", {
          code,
          redirectUrl,
          origin,
        });

        const response = await kakaoLogin({
          code,
          redirectUri: redirectUrl,
          isLocal: origin.includes("localhost"),
        });

        console.log("✅ 로그인 완료 응답:", response);

        const ok =
          response?.success &&
          typeof response?.data?.data?.userType === "string" &&
          response.data.data.userType.length > 0;

        console.log("🔍 userType 체크:", {
          ok,
          userType: response?.data?.data?.userType,
        });

        router.replace(ok ? PATHS.HOME : PATHS.AGREEMENT);
      } catch (error: any) {
        console.error("❌ 로그인 처리 중 에러:", error);
        router.push(
          `/login?error=${encodeURIComponent(error?.message || "Login failed")}`,
        );
      }
    };

    handleLogin();
  }, [code, kakaoLogin, router]);
  return isPending ? <Loading /> : null;
}
