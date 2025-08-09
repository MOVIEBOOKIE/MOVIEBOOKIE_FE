"use client";

import { CardProps } from "app/_types/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function TicketCard({
  id,
  imageUrl,
  title,
  placeAndDate,
  description,
  estimatedPrice,
  category,
}: CardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/event/ticket/${id}`);
  };
  return (
    <div
      onClick={handleClick}
      className="relative flex flex-col overflow-hidden rounded-xl bg-gray-950"
    >
      <div className="relative h-41.75 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="mt-4.75 mb-4.5 flex flex-col px-4">
        <p className="caption-1-medium text-gray-500">{category}</p>
        <h2 className="body-1-semibold text-white">{title}</h2>
        <p className="caption-1-medium pt-0.5 text-gray-400">{placeAndDate}</p>

        {description && (
          <p className="caption-1-regular mt-2 line-clamp-2 text-gray-600">
            {description}
          </p>
        )}

        {estimatedPrice && (
          <p className="body-3-semibold mt-2 gap-1 text-gray-200">
            예상가격
            <span className="ml-0.75">
              {Number(estimatedPrice).toLocaleString()}원
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
