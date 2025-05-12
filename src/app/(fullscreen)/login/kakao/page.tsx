"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginKakao() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    console.log("수신된 인가 코드:", code);

    if (!code) {
      console.warn("인가 코드가 없습니다. /kakao로 이동합니다.");
      router.push("/kakao");
      return;
    }

    console.log("인가 코드가 정상적으로 수신됨:", code);

    // 이후 서버로 요청 로직
  }, [code, router]);

  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <h1 className="text-xl text-white">로그인 중...</h1>
    </div>
  );
}
