"use client";

import { Button, Card, FixedLayout, Header } from "@/components";
import Pagination from "@/components/pagination";
import { PATHS } from "@/constants";
import { EmptyIcon } from "@/icons/index";
import { CardData } from "app/_types/card";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CategoryPageClient({
  label,
  cards,
}: {
  label: string;
  cards: CardData[];
}) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();
  const start = currentPage * itemsPerPage;
  const paginated = cards.slice(start, start + itemsPerPage);

  return (
    <FixedLayout
      title={label}
      showBackButton
      isHeader
      showBottomButton={false}
      state="default"
    >
      <div className="mt-6 flex flex-1 flex-col overflow-y-auto">
        {paginated.length > 0 ? (
          paginated.map((card, idx) => (
            <div key={idx} className="relative">
              <Card {...card} />
              {idx < paginated.length - 1 && (
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
      {paginated.length > 0 && (
        <div className="w-full">
          <Pagination
            pageCount={Math.ceil(cards.length / itemsPerPage)}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </FixedLayout>
  );
}
