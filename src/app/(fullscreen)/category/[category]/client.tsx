"use client";

import { Card, Header } from "@/components";
import Pagination from "@/components/pagination";
import { useState } from "react";

type CardData = {
  imageUrl: string;
  category: string;
  title: string;
  placeAndDate: string;
  description?: string;
  ddayBadge?: string;
  statusBadge?: string;
  progressRate?: string;
  estimatedPrice?: string;
};

export default function CategoryPageClient({
  label,
  cards,
}: {
  label: string;
  cards: CardData[];
}) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);

  const start = currentPage * itemsPerPage;
  const paginated = cards.slice(start, start + itemsPerPage);

  return (
    <div className="flex min-h-screen flex-col px-5 pt-11 text-white">
      <Header title={label} />

      <div className="mt-6 flex flex-col">
        {paginated.length > 0 ? (
          paginated.map((card, idx) => (
            <div key={idx}>
              <Card {...card} />
              {idx < paginated.length - 1 && (
                <div className="my-4 h-px w-full bg-gray-950" />
              )}
            </div>
          ))
        ) : (
          <p className="mt-8 text-center text-gray-500">
            등록된 이벤트가 없습니다.
          </p>
        )}
      </div>

      <Pagination
        pageCount={Math.ceil(cards.length / itemsPerPage)}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
