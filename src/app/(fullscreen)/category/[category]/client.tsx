"use client";

import { useEffect, useState } from "react";
import { Card, FixedLayout } from "@/components";
import Pagination from "@/components/pagination";
import { PATHS } from "@/constants";
import { EmptyIcon } from "@/icons/index";
import { mapEventCardToCardProps } from "@/utils/map-to-eventcard";
import { EventCard } from "app/_types/card";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function CategoryPageClient({ label }: { label: string }) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [cards, setCards] = useState<EventCard[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/events/category", {
        params: {
          category: label,
          page: currentPage,
          size: itemsPerPage,
        },
        headers: {
          // 필요 시 인증
          // Authorization: `Bearer ${yourToken}`
        },
      });

      setCards(res.data.result); // 배열
      setTotalCount(res.data.totalCount ?? 100); // 백엔드가 지원하면 정확히
    } catch (err) {
      console.error("이벤트 불러오기 실패:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [currentPage, label]);

  return (
    <FixedLayout
      title={label}
      showBackButton
      isHeader
      showBottomButton={false}
      state="default"
    >
      <div className="mt-6 flex flex-1 flex-col overflow-y-auto">
        {isLoading ? (
          <div className="text-center text-gray-500">불러오는 중...</div>
        ) : cards.length > 0 ? (
          cards.map((card, idx) => (
            <div key={card.eventId}>
              <Card {...mapEventCardToCardProps(card)} />
              {idx < cards.length - 1 && (
                <div className="my-4 h-px w-full bg-gray-950" />
              )}
            </div>
          ))
        ) : (
          <div className="mb-80 flex flex-col items-center justify-center pt-30 text-center text-gray-500">
            <EmptyIcon />
            <p className="body-3-medium mt-3.5 mb-7 text-gray-800">
              아직 모집 이벤트가 없어요 <br />
              지금 바로 나만의 이벤트를 만들어보세요
            </p>
            <button
              onClick={() => router.push(PATHS.EVENT_CREATE)}
              className="bg-red-main body-3-semibold w-75 rounded-xl px-6 py-4 text-white"
            >
              나만의 이벤트 만들러 가기
            </button>
          </div>
        )}
      </div>

      {!isLoading && cards.length > 0 && (
        <div className="w-full">
          <Pagination
            pageCount={Math.ceil(totalCount / itemsPerPage)}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </FixedLayout>
  );
}
