"use client";

//TODO: setTimeout 3초
import { LogoWhiteIcon } from "@/icons/index";
export default function Intro() {
  return (
    <main className="relative h-screen w-full bg-[url('/images/custom-bg.png')] bg-cover bg-center">
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
