"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CardProps {
  id: string;
  imageUrl: string;
  category: string;
  title: string;
  placeAndDate: string;
  description?: string;
  ddayBadge?: string | null;
  statusBadge?: string;
  progressRate?: string;
  estimatedPrice?: string;
}

export default function Card({
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
}: CardProps) {
  const router = useRouter();
  return (
    <div
      className="relative flex h-30 w-full gap-3"
      onClick={() => router.push(`/detail/${id || 1}`)}
    >
      <div className="relative h-30 w-30 overflow-hidden rounded-md">
        <Image
          src={imageUrl}
          alt="포스터 이미지"
          fill
          className="object-cover"
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
          <p className="caption-2-medium mt-0.5 text-gray-700">
            {placeAndDate}
          </p>
          {description && (
            <p className="caption-1-regular mt-1.5 mb-1.5 line-clamp-2 text-gray-500">
              {description}
            </p>
          )}
        </div>

        {(progressRate || estimatedPrice) && (
          <div className="caption-2-medium flex items-center justify-start gap-1.75 text-gray-700">
            {progressRate && (
              <p>
                모집 달성율
                <span className="ml-0.75 text-gray-300">{progressRate}</span>
              </p>
            )}
            {estimatedPrice && (
              <p>
                예상가격{" "}
                <span className="ml-0.75 text-gray-300">{estimatedPrice}</span>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
