"use client";

import { EmptyIcon, SwipeDownIcon } from "@/icons/index";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button, Card, Input, Carousel } from "@/components";
import { CATEGORIES, PATHS, CATEGORY_LABELS } from "@/constants";
import { categoryMap } from "@/constants/category-map";
import { MOCK_DATA } from "@/mocks/mock-data";
import { useUserStore } from "app/_stores/useUserStore";
import { getMyPageInfo } from "app/_apis/auth/mypage";

export default function Home() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const router = useRouter();
  const [selected, setSelected] =
    useState<(typeof CATEGORY_LABELS)[number]>("인기");

  const containerRef = useRef<HTMLDivElement>(null);
  const [isFirstScreen, setIsFirstScreen] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (user) return;

      try {
        const res = await getMyPageInfo();
        if (res) {
          setUser({
            email: res.certificationEmail,
            nickname: res.username,
            profileImage: res.profileImage,
            userTypeTitle: res.userType,
            hostExperienceCount: res.hostExperienceCount,
            participationExperienceCount: res.participationExperienceCount,
            ticketCount: 0,
          });
        }
      } catch (err) {
        console.error("유저 정보 요청 실패", err);
        // router.push("/login");
      }
    };

    fetchUser();
  }, [user, setUser]);

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

  const handleSearch = () => {
    router.push(PATHS.SEARCH);
  };

  const handleClick = () => {
    if (!selected) return;

    const mapped = categoryMap[selected];
    if (!mapped) return;

    const upperKey = mapped.toUpperCase() as keyof typeof PATHS.CATEGORY;

    router.push(PATHS.CATEGORY[upperKey]);
  };

  const handleCategoryClick = (category: keyof typeof CATEGORIES) => {
    if (category === "인기" || category === "최신") return;
    const type = CATEGORIES[category];
    router.push(`/category/${type}`);
  };

  return (
    <div
      ref={containerRef}
      className="scrollbar-hide title-1-bold h-[calc(100vh-102px)] snap-y snap-mandatory snap-start overflow-y-scroll scroll-smooth"
    >
      <section className="flex h-screen snap-start flex-col items-center overflow-x-hidden pt-15.75">
        <div className="mb-7 flex flex-col items-center">
          <p className="body-3-medium text-gray-300">
            {" "}
            {user?.userTypeTitle || "~~러"}
          </p>
          <h2 className="title-1-bold text-gray-white mt-0.75">
            {user?.nickname || "사용자"}님을 위한 추천
          </h2>
        </div>
        <Carousel />

        <motion.div
          className="from-gray-black/0 to-gray-black fixed bottom-0 z-10 mb-25.5 flex w-full flex-col items-center gap-1 bg-gradient-to-b from-0% to-50% pt-14.25 pb-3"
          initial={{ opacity: 1 }}
          animate={{
            opacity: isFirstScreen ? 1 : 0,
            display: isFirstScreen ? "flex" : "none",
          }}
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
        <Input type="BUTTON" onClick={handleSearch} />
        <div className="scrollbar-hide mt-3 -mr-4 mb-4 flex overflow-x-auto whitespace-nowrap">
          {CATEGORY_LABELS.map((label) => (
            <div key={label} className="flex items-center">
              <button
                className={`body-2-semibold rounded-full px-3.5 py-2.25 ${
                  selected === label ? "text-red-main" : "text-gray-500"
                }`}
                onClick={() => {
                  setSelected(label);
                  handleCategoryClick(label);
                }}
              >
                {label}
              </button>
              {label === "최신" && (
                <div className="mx-2 h-4 w-px bg-gray-800" />
              )}
            </div>
          ))}
        </div>
        {MOCK_DATA.length === 0 ? (
          <div className="mb-80 flex flex-col items-center justify-center pt-30 text-center text-gray-500">
            <EmptyIcon />
            <p className="body-3-medium mt-3.5 text-gray-800">
              아직 모집 이벤트가 없어요 <br />
              지금 바로 나만의 이벤트를 만들어보세요
            </p>
          </div>
        ) : (
          MOCK_DATA.map((card, index) => (
            <div key={index}>
              <Card
                {...card}
                imageUrl={
                  typeof card.imageUrl === "string"
                    ? card.imageUrl
                    : (card.imageUrl as any).src
                }
              />
              {index !== MOCK_DATA.length - 1 && (
                <div className="my-4 h-0.25 w-full bg-gray-950" />
              )}
            </div>
          ))
        )}
        {MOCK_DATA.length > 0 && (
          <Button
            className="mt-6 mb-8.5"
            variant="secondary"
            onClick={handleClick}
          >
            더보기
          </Button>
        )}
      </motion.section>
    </div>
  );
}
