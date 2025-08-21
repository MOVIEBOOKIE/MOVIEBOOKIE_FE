"use client";

import { Card, Input } from "@/components";
import { BackIcon, EmptyIcon } from "@/icons/index";
import CategoryButton from "./_components/category-button";
import { EVENT_CATEGORIES } from "@/constants";
import { useRouter } from "next/navigation";
import type React from "react";
import { useLayoutEffect, useRef, useState } from "react";
import { useGetEventSearch } from "app/_hooks/events/use-events";
import { useDebounce } from "use-debounce";
import Pagination from "@/components/pagination";

export default function Search() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState("");
  const [debouncedContent] = useDebounce(content, 1000);
  const [currentPage, setCurrentPage] = useState(0);

  const { data } = useGetEventSearch(
    {
      content: debouncedContent,
      page: currentPage,
    },
    {
      enabled: debouncedContent.length > 0,
    },
  );

  const cards = data?.eventList ?? [];
  const totalPages = data?.totalPages ?? 0;

  const handleClick = () => {
    router.push("/?to=category");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
    setCurrentPage(0);
  };
  useLayoutEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <div className="mt-4 flex min-h-screen w-full flex-col">
      <div className="mt-5.5 flex w-full items-center gap-2 pr-5 pl-2.5">
        <BackIcon onClick={handleClick} />
        <Input
          type="INPUT"
          ref={inputRef}
          value={content}
          onChange={handleChange}
          placeholder="이벤트 검색하기"
        />
      </div>

      {!data ? (
        <div className="flex-1">
          <p className="body-2-medium mt-6 mb-2.75 ml-5.5 text-gray-300">
            어떤 이벤트를 찾으시나요?
          </p>

          <div className="gap mx-5 grid grid-cols-2 justify-center gap-3.25">
            {EVENT_CATEGORIES.map((category, idx) => (
              <CategoryButton
                key={category.path}
                label={category.label}
                src={category.src}
                path={category.path}
                index={idx}
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="mt-6 flex flex-1 flex-col gap-8 px-5">
            {cards.length > 0 ? (
              cards.map((card) => (
                <Card
                  key={String(card.eventId)}
                  id={String(card.eventId)}
                  imageUrl={card.posterImageUrl}
                  category={card.mediaType}
                  title={card.mediaTitle}
                  placeAndDate={`${card.locationName} · ${card.eventDate}`}
                  description={card.description}
                  ddayBadge={`D-${card.d_day}`}
                  statusBadge={card.eventStatus}
                  progressRate={`${card.rate}%`}
                  estimatedPrice={card.estimatedPrice}
                />
              ))
            ) : (
              <div className="mt-64.5 flex flex-col items-center justify-center text-center text-gray-500">
                <EmptyIcon />
                <p className="body-3-medium mt-3.5 text-gray-800">
                  검색 결과가 없어요 <br />
                  다른 검색어를 입력해보세요
                </p>
              </div>
            )}
          </div>

          {cards.length > 0 && (
            <div className="mt-auto mb-[34px]">
              <Pagination
                pageCount={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
