"use client";

import { EventCard } from "app/_types/card";
import Image from "next/image";

export function Card({
  posterImageUrl,
  mediaTitle,
  locationName,
  eventDate,
  description,
  eventStatus,
  rate,
  estimatedPrice,
}: EventCard) {
  const progressRate = rate !== undefined ? `${rate}%` : undefined;
  const placeAndDate = `${locationName} · ${eventDate}`;

  return (
    <div className="relative flex flex-col overflow-hidden rounded-xl bg-gray-950">
      <div className="relative h-41.75 w-full overflow-hidden">
        <Image
          src={posterImageUrl}
          alt={mediaTitle}
          fill
          className="object-cover"
        />

        {eventStatus && (
          <div className="caption-1-medium absolute top-2.5 left-2.5 flex h-6 items-center justify-center rounded-md bg-gray-950 px-1.5 py-1 text-center text-gray-200">
            {eventStatus}
          </div>
        )}
      </div>

      <div className="mt-4.75 mb-4.5 flex flex-col px-4">
        <h2 className="body-1-semibold text-white">{mediaTitle}</h2>
        <p className="caption-1-medium pt-0.5 text-gray-500">{placeAndDate}</p>

        {description && (
          <p className="caption-1-regular mt-4.75 line-clamp-2 text-gray-600">
            {description}
          </p>
        )}

        {(progressRate || estimatedPrice) && (
          <div className="caption-1-regular mt-4.75 flex gap-3 text-gray-300">
            {progressRate && (
              <span>
                모집 달성율{" "}
                <span className="body-3-semibold pl-1.25 text-gray-200">
                  {progressRate}
                </span>
              </span>
            )}
            {estimatedPrice && (
              <span>
                예상 가격{" "}
                <span className="body-3-semibold pl-1.25 text-gray-200">
                  {estimatedPrice.toLocaleString()}원
                </span>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
