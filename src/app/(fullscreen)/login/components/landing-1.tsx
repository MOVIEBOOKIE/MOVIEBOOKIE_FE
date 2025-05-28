"use client";

import { useState, useEffect } from "react";

const movies = [
  {
    id: 1,
    src: "/image (5).png",
    alt: "Life 영화 포스터",
    title: "라이프",
    subtitle: "산토 아모레스 · 2025. 05. 26",
  },
  {
    id: 2,
    src: "/image (10).png",
    alt: "Billy Elliot 영화 포스터",
    title: "빌리 엘리어트",
    subtitle: "스티븐 달드리 · 2000. 09. 29",
  },
  {
    id: 3,
    src: "/image (7).png",
    alt: "태풍이 지나가고 영화 포스터",
    title: "태풍이 지나가고",
    subtitle: "고레에다 히로카즈 · 2016. 05. 21",
  },
  {
    id: 4,
    src: "/image (8).png",
    alt: "라우더 댄 밤즈 영화 포스터",
    title: "라우더 댄 밤즈",
    subtitle: "요아킴 트리어 · 2015. 05. 18",
  },
  {
    id: 5,
    src: "/image (9).png",
    alt: "아가씨 영화 포스터",
    title: "아가씨",
    subtitle: "박찬욱 · 2016. 06. 01",
  },
];

export default function LandingFirst() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === movies.length - 1 ? 0 : prevIndex + 1,
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-between pt-12 pb-11">
      <div className="px-5 text-center">
        <h2 className="title-1-bold mb-2 whitespace-pre-line">
          {"무비부키가 \n 당신의 취향을 저격해요"}
        </h2>
        <p className="body-3-medium mt-2 mb-2 whitespace-pre-line text-gray-400">
          {"좋아하는 콘텐츠를 기반으로 \n 내게 딱 맞는 이벤트를 추천받아요"}
        </p>
      </div>

      <div className="relative mt-12 h-96 w-full overflow-hidden px-4">
        <div
          className="flex h-full items-center transition-transform duration-700 ease-out"
          style={{
            transform: `translateX(calc(-${currentIndex * 240}px + 50px))`,
            width: `${movies.length * 260}px`,
          }}
        >
          {movies.map((movie, index) => {
            const offset = index - currentIndex;
            const isActive = index === currentIndex;

            return (
              <div
                key={movie.id}
                className="relative mx-1 flex-shrink-0 transition-all duration-700 ease-out"
                style={{
                  width: "240px",
                  transform: `scale(${isActive ? 1 : 0.8})`,
                  opacity: Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.5,
                  zIndex: isActive ? 10 : Math.abs(offset) === 1 ? 5 : 0,
                }}
              >
                <div className="relative h-full overflow-hidden rounded-2xl bg-gray-800 shadow-2xl">
                  <div className="relative h-full">
                    <img
                      src={movie.src}
                      alt={movie.alt}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute right-0 bottom-0 left-0 p-4 text-white">
                      <div className="mb-2 inline-block rounded bg-gray-700/80 px-2 py-1 text-xs text-white">
                        영화
                      </div>
                      <h3 className="mb-1 line-clamp-2 text-lg font-bold">
                        {movie.title}
                      </h3>
                      <p className="text-sm text-gray-300 opacity-90">
                        {movie.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
