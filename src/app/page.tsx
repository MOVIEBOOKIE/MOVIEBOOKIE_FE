"use client";

import { SwipeDownIcon } from "@/icons";
import Carousel from "./(route)/home/_components/carousel";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Input from "./_components/input";
import { PATHS } from "./constants/paths";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const containerRef = useRef<HTMLDivElement>(null);
  const [isFirstScreen, setIsFirstScreen] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollTop = containerRef.current.scrollTop;
      const screenHeight = window.innerHeight;
      setIsFirstScreen(scrollTop < screenHeight / 2);
    };

    const el = containerRef.current;
    if (el) el.addEventListener("scroll", handleScroll);
    return () => el?.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    router.push(PATHS.SEARCH);
  };

  return (
    <div
      ref={containerRef}
      className="h-screen snap-y snap-mandatory snap-start overflow-y-scroll scroll-smooth"
    >
      <section className="flex h-screen snap-start flex-col items-center overflow-x-hidden pt-15.75">
        <div className="mb-7 flex flex-col items-center">
          <p className="body-1-medium text-gray-300">못말리는 영화러버</p>
          <h2 className="title-1-bold text-gray-white mt-0.75">
            서현님을 위한 추천
          </h2>
        </div>
        <Carousel />

        <motion.div
          className="from-gray-black/0 to-gray-black fixed bottom-0 z-10 mb-25.5 flex w-full flex-col items-center gap-1 bg-gradient-to-b from-0% to-50% pt-14.25 pb-3"
          initial={{ opacity: 1 }}
          animate={{ opacity: isFirstScreen ? 1 : 0 }}
          transition={{ duration: 0 }}
        >
          <p className="caption-1-medium text-gray-white opacity-47">
            더 많은 이벤트를 찾으려면 아래로 스와이프
          </p>
          <SwipeDownIcon className="h-6 w-6" />
        </motion.div>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: isFirstScreen ? 0 : 1 }}
        transition={{ duration: 0.6 }}
        className="flex h-full w-full snap-start flex-col px-5"
      >
        <div className="mt-6.25 mb-4 flex flex-col items-center gap-1.25">
          <SwipeDownIcon className="h-6 w-6 rotate-180" />
          <p className="caption-1-medium text-gray-white opacity-47">
            맞춤 이벤트 추천은 위로 스와이프
          </p>
        </div>
        <Input type="BUTTON" onClick={handleClick} />
      </motion.section>
    </div>
  );
}
