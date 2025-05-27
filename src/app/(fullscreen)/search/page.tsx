"use client";

import { Card, Input } from "@/components";
import { BackIcon } from "@/icons/index";
import CategoryButton from "./_components/category-button";
import { EVENT_CATEGORIES } from "@/constants";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useGetEventSearch } from "app/_hooks/events/use-events";
import { useDebounce } from "use-debounce";
import Pagination from "@/components/pagination";

export default function Search() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState("");
  const [debouncedContent] = useDebounce(content, 300);
  const [page] = useState(0);

  const { data } = useGetEventSearch(
    { content: debouncedContent, page },
    {
      enabled: debouncedContent.trim().length > 0,
    },
  );

  console.log(data);

  const handleClick = () => {
    router.back();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  return (
    <div className="w-full">
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
        <>
          <p className="body-2-medium mt-6 ml-5.5 text-gray-300">
            어떤 이벤트를 찾으시나요?
          </p>

          <div className="gap mx-auto mt-4.5 grid w-fit grid-cols-2 justify-center gap-3.25">
            {EVENT_CATEGORIES.map((category) => (
              <CategoryButton
                key={category.path}
                label={category.label}
                src={category.src}
                path={category.path}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="mt-6 flex flex-col gap-8 px-5">
            {data.map((card) => (
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
            ))}
          </div>
          {/* <Pagination
            pageCount={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          /> */}
        </>
      )}
    </div>
  );
}
