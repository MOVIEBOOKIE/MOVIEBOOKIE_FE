"use client";

import { StepHeader } from "@/components";
import { useRecommendedCinemas } from "app/_hooks/use-recommend-cinema";
import Loading from "app/loading";
import Image from "next/image";
import { useFormContext, useWatch } from "react-hook-form";
import { LocationIcon } from "@/icons/index";
import { formatPrice } from "@/utils/format-price";
export default function Step6() {
  const { setValue, control } = useFormContext();
  const selectedLocationId = useWatch({ control, name: "locationId" });
  const mediaType = useWatch({ control, name: "mediaType" });
  const min = useWatch({ control, name: "minParticipants" });
  const max = useWatch({ control, name: "maxParticipants" });
  const startTime = useWatch({ control, name: "eventStartTime" });
  const progressTime = useWatch({ control, name: "eventProgressTime" });

  const { data: cinemas = [], isLoading } = useRecommendedCinemas({
    mediaType,
    min: Number(min),
    max: Number(max),
    startTime,
    progressTime: Number(progressTime),
  });

  const handleSelectCinema = (cinemaId: number) => {
    setValue("locationId", cinemaId, { shouldValidate: true });
  };

  return (
    <div className="bg-gray-black fixed inset-0 mt-17 flex flex-col items-center overflow-hidden">
      <div className="flex h-full w-full max-w-125 flex-col">
        <div className="sticky top-0 z-10 px-5 pt-5 pb-2">
          <StepHeader
            StepHeader="6/7"
            title={
              <>
                이벤트를 상영할 <br /> 영화관을 선택해주세요
              </>
            }
            description={<>진행할 이벤트 특성에 어울리는 공간을 찾아보세요</>}
            className="mb-0"
          />
        </div>
        <div className="flex-1 overflow-y-auto pb-32">
          {isLoading ? (
            <Loading />
          ) : (
            cinemas.map((cinema: any) => {
              const isSelected = selectedLocationId === cinema.locationId;
              return (
                <div
                  key={cinema.locationId}
                  className={`${isSelected ? "bg-gray-950 px-5" : "px-5"}`}
                >
                  <div
                    className="relative flex gap-4 border-b border-gray-950 py-5"
                    onClick={() => handleSelectCinema(cinema.locationId)}
                  >
                    {!isSelected && selectedLocationId !== null && (
                      <div className="bg-gray-black bg-opacity-70 absolute inset-0 z-10" />
                    )}
                    <div className="relative z-20 flex-1 gap-3">
                      <div className="mb-2 flex flex-wrap gap-1">
                        {cinema.locationKeywordList.map(
                          (tag: string, idx: number) => (
                            <span
                              key={idx}
                              className={`caption-3-medium mt-0.5 rounded-[4px] px-1.5 py-1 ${
                                tag === "소규모"
                                  ? "bg-[#F19226] text-white"
                                  : tag === "중규모"
                                    ? "bg-[#ED5878] text-white"
                                    : tag === "대규모"
                                      ? "bg-[#1A70C7] text-white"
                                      : "bg-gray-850 text-gray-300"
                              }`}
                            >
                              {tag}
                            </span>
                          ),
                        )}
                      </div>
                      <div className="body-2-semibold text-gray-200">
                        {cinema.locationName}
                      </div>
                      <div className="mt-2 mb-1 flex items-center gap-1">
                        <LocationIcon />
                        <div className="caption-1-medium truncate overflow-hidden whitespace-nowrap text-gray-400">
                          {cinema.address}
                        </div>
                      </div>
                      <div className="caption-1-medium mb-1 text-gray-400">
                        좌석 {cinema.seatCount} | 시간당{" "}
                        {formatPrice(cinema.pricePerHour)}
                      </div>
                    </div>
                    <div className="relative z-20 h-30 w-30 shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={cinema.locationImageUrl}
                        alt={cinema.locationName}
                        width={96}
                        height={96}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
