"use client";

//TODO: setTimeout 3초
import Logo from "@/icons/logo-white.svg";
export default function Intro() {
  return (
    <main className="relative h-screen w-full bg-[url('/images/custom-bg.png')] bg-cover bg-center">
      <Logo className="absolute top-[330px] left-1/2 -translate-x-1/2" />
      <h1 className="body-2-medium absolute top-[419px] left-1/2 -translate-x-1/2 text-white">
        당신의 일상을 영화처럼
      </h1>
    </main>
  );
}
