"use client";

import { SwipeDownIcon } from "@/icons";
import Carousel from "./(route)/home/_components/carousel";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Input from "./_components/input";
import { PATHS } from "./constants/paths";
import { useRouter } from "next/navigation";
import Card from "./_components/main-card";
import { MOVIE_LISTS } from "./_mocks/movie-list";
import Button from "./_components/button";
import { CATEGORIES } from "./constants/categories";

export default function Home() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>("인기");

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
      className="h-[calc(100vh-102px)] snap-y snap-mandatory snap-start overflow-y-scroll scroll-smooth"
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
          <p className="caption-2-medium text-gray-white opacity-47">
            더 많은 이벤트를 찾으려면 아래로 스와이프
          </p>
          <SwipeDownIcon className="h-6 w-6" />
        </motion.div>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: isFirstScreen ? 0 : 1 }}
        transition={{ duration: 0.6 }}
        className="flex snap-start flex-col px-5"
      >
        <div className="mt-6.25 mb-4 flex flex-col items-center gap-1.25">
          <SwipeDownIcon className="h-6 w-6 rotate-180" />
          <p className="caption-2-medium text-gray-white opacity-47">
            맞춤 이벤트 추천은 위로 스와이프
          </p>
        </div>
        <Input type="BUTTON" onClick={handleClick} />
        <div className="scrollbar-hide mt-3 -mr-4 mb-4 flex overflow-x-auto whitespace-nowrap">
          {CATEGORIES.map((label) => (
            <div key={label} className="flex items-center">
              <button
                className={`body-2-semibold rounded-full px-3.5 py-2.25 ${
                  selected === label ? "text-red-main" : "text-gray-500"
                }`}
                onClick={() => setSelected(label)}
              >
                {label}
              </button>
              {label === "최신" && (
                <div className="mx-2 h-4 w-px bg-gray-800" />
              )}
            </div>
          ))}
        </div>
        {MOVIE_LISTS.map((card, index) => (
          <div key={index}>
            <Card {...card} />
            {index !== MOVIE_LISTS.length - 1 && (
              <div className="my-4 h-0.25 w-full bg-gray-950" />
            )}
          </div>
        ))}
        <Button className="mt-6 mb-8.5">더보기</Button>
      </motion.section>
    </div>
  );
}
