"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogoWhiteIcon } from "@/icons/index";
import Image from "next/image";

export default function Intro() {
  const router = useRouter();

  useEffect(() => {
    const hasSeen =
      typeof window !== "undefined" && sessionStorage.getItem("introShown");
    if (hasSeen) {
      router.replace("/");
      return;
    }

    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("introShown", "true");
      }
      router.replace("/");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="pt-safe-top relative h-[100dvh] w-full bg-cover bg-center">
      <Image
        src="/images/custom-bg.webp"
        alt="Intro Background"
        fill
        priority
        placeholder="blur"
        blurDataURL="/images/custom-bg.webp"
        className="z-0 object-cover"
      />
      <div className="absolute top-[47.14%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="flex flex-col items-center">
          <LogoWhiteIcon width={100} height={100} />
          <h1 className="body-2-medium -mt-2 text-white">
            당신의 일상을 영화처럼
          </h1>
        </div>
      </div>
    </main>
  );
}
