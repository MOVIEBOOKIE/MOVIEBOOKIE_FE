// /hooks/useAuth.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      router.push("/kakao"); // 로그인이 안 된 경우 /kakao로 이동
    }
  }, [router]);

  return { isAuthenticated };
}
