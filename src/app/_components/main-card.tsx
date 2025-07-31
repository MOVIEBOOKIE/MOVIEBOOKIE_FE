"use client";

import React, { memo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CardProps } from "app/_types/card";

function Card({
  id,
  imageUrl,
  category,
  title,
  placeAndDate,
  description,
  ddayBadge,
  statusBadge,
  progressRate,
  estimatedPrice,
  query = {},
}: CardProps) {
  const router = useRouter();

  const handleClick = () => {
    const queryParams = new URLSearchParams(query).toString();
    router.push(`/detail/${id}${queryParams ? `?${queryParams}` : ""}`);
  };

  return (
    <div className="relative flex h-30 w-full gap-3" onClick={handleClick}>
      <div className="relative h-30 w-30 overflow-hidden rounded-md">
        <Image
          src={imageUrl || "/images/default-image.png"}
          alt={title}
          fill
          loading="lazy"
          className="object-cover"
          sizes="120px"
        />

        {(ddayBadge || statusBadge) && (
          <div className="absolute top-1.5 left-1.5 flex h-6 items-center gap-1">
            {statusBadge && (
              <div className="caption-1-medium rounded-md bg-gray-950 px-1.5 py-1 text-white">
                {statusBadge}
              </div>
            )}
            {ddayBadge && (
              <div className="caption-1-medium bg-red-main rounded-md px-1.5 py-1 text-white">
                {ddayBadge}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-center">
        <div>
          <p className="caption-1-medium text-gray-500">{category}</p>
          <h2 className="body-2-semibold line-clamp-1 text-white">{title}</h2>
          <p className="caption-2-medium mt-0.5 text-gray-400">
            {placeAndDate}
          </p>
          {description && (
            <p className="caption-1-regular mt-1.5 mb-1.5 line-clamp-2 text-gray-500">
              {description}
            </p>
          )}
        </div>

        {(progressRate || estimatedPrice) && (
          <div className="caption-2-medium flex items-center justify-start gap-1.75 text-gray-500">
            {progressRate && (
              <p>
                모집 달성율
                <span className="ml-0.75 text-gray-200">{progressRate}</span>
              </p>
            )}
            {estimatedPrice && (
              <p>
                예상가격
                <span className="ml-0.75 text-gray-200">
                  {Number(estimatedPrice).toLocaleString()}원
                </span>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default memo(Card);
