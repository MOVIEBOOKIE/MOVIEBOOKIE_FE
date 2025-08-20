"use client";

import { useEffect, useState } from "react";

export function useSmallScreen(breakpoint = 700) {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 높이 기준으로 판단 (아이폰 SE 등 세로 높이 667px 이하)
    const mql = window.matchMedia(`(max-height: ${breakpoint}px)`);

    const handleChange = (e: MediaQueryListEvent) => setIsSmall(e.matches);

    setIsSmall(mql.matches);

    if (mql.addEventListener) mql.addEventListener("change", handleChange);
    else mql.addListener(handleChange);

    return () => {
      if (mql.removeEventListener)
        mql.removeEventListener("change", handleChange);
      else mql.removeListener(handleChange);
    };
  }, [breakpoint]);

  return isSmall;
}
