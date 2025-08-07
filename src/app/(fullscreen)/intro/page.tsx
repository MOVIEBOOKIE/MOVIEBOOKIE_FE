"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogoWhiteIcon } from "@/icons/index";
import Image from "next/image";

export default function Intro() {
  const router = useRouter();

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("introShown");

    if (hasSeen) {
      router.replace("/");
      return;
    }

    const timer = setTimeout(() => {
      sessionStorage.setItem("introShown", "true");
      router.replace("/");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main
      className="fixed inset-0 w-full bg-cover bg-center"
      style={{
        height: "100dvh",
        paddingTop: "env(safe-area-inset-top)",
        marginTop: "calc(-1 * env(safe-area-inset-top))",
        minHeight: "calc(100dvh + env(safe-area-inset-top))",
      }}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          top: "calc(-1 * env(safe-area-inset-top))",
          height: "calc(100% + env(safe-area-inset-top))",
        }}
      >
        <Image
          src="/images/custom-bg.webp"
          alt="Intro Background"
          fill
          priority
          placeholder="blur"
          blurDataURL="/images/custom-bg.webp"
          className="object-cover"
        />
      </div>
      <div
        className="absolute left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center"
        style={{
          top: "calc(50% - env(safe-area-inset-top) / 2)",
        }}
      >
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
