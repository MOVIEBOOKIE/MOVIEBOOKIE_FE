"use client";

import React from "react";
import Image from "next/image";

interface CardProps {
  imageUrl: string;
  category: string;
  title: string;
  placeAndDate: string;
  description?: string;
  ddayBadge?: string;
  statusBadge?: string;
  progressRate?: string;
  estimatedPrice?: string;
}

export default function Card({
  imageUrl,
  category,
  title,
  placeAndDate,
  description,
  ddayBadge,
  statusBadge,
  progressRate,
  estimatedPrice,
}: CardProps) {
  return (
    <div className="relative flex h-[120px] w-full gap-[12px] px-[20px]">
      <div className="relative h-[120px] w-[120px] overflow-hidden rounded-[8px]">
        <Image
          src={imageUrl}
          alt="포스터 이미지"
          fill
          className="object-cover"
        />

        {(ddayBadge || statusBadge) && (
          <div className="absolute top-[6px] left-[6px] flex h-[24px] items-center gap-[4px]">
            {ddayBadge && (
              <div className="caption-1-medium bg-red-main rounded-[6px] px-[6px] py-[4px] text-white">
                {ddayBadge}
              </div>
            )}
            {statusBadge && (
              <div className="caption-1-medium rounded-[6px] bg-gray-950 px-[6px] py-[4px] text-white">
                {statusBadge}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-center">
        <div>
          <p className="caption-1-medium text-gray-500">{category}</p>
          <h2 className="body-2-semibold line-clamp-1 text-white">{title}</h2>
          <p className="caption-2-medium mt-[2px] text-gray-700">
            {placeAndDate}
          </p>
          {description && (
            <p className="caption-1-regular mt-[6px] mb-[6px] line-clamp-2 text-gray-500">
              {description}
            </p>
          )}
        </div>

        {(progressRate || estimatedPrice) && (
          <div className="caption-2-medium flex items-center justify-start gap-[7px] text-gray-700">
            {progressRate && (
              <p>
                모집 달성율{" "}
                <span className="text-gray-300">{progressRate}</span>
              </p>
            )}
            {estimatedPrice && (
              <p>
                예상가격 <span className="text-gray-300">{estimatedPrice}</span>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
