"use client";

import { StepHeader } from "@/components";
import { mockCinemas } from "@/mocks/mock-cinemas";
import Image from "next/image";
import { useFormContext } from "react-hook-form";

export default function Step6() {
  const { setValue, watch } = useFormContext();
  const selectedLocationId = watch("locationId");

  const handleSelectCinema = (cinemaId: number) => {
    setValue("locationId", cinemaId, { shouldValidate: true });
  };

  return (
    <>
      <StepHeader
        StepHeader="6/7"
        title={
          <>
            이벤트를 상영할 <br />
            영화관을 선택해주세요
          </>
        }
        description={<>진행할 이벤트 특성에 어울리는 공간을 찾아보세요</>}
      />

      <div className="mb-8 flex-1 space-y-6 overflow-y-auto">
        {mockCinemas.map((cinema) => {
          const isSelected = selectedLocationId === cinema.id;
          return (
            <div
              key={cinema.id}
              className={`${isSelected ? "mb-0 bg-gray-950" : "mb-0"}`}
            >
              <div
                className="relative flex gap-4 border-b border-gray-950 px-5 py-5"
                onClick={() => handleSelectCinema(cinema.id)}
              >
                {!isSelected && selectedLocationId !== null && (
                  <div className="bg-opacity-70 bg-gray-black absolute inset-0 z-10"></div>
                )}

                <div className="relative z-20 flex-1 gap-3">
                  <div className="mb-2 flex flex-wrap gap-1">
                    {cinema.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`caption-3-medium rounded-md px-1.5 py-1 ${
                          tag === "대규모" || tag === "소규모"
                            ? "bg-[#F19226] text-white"
                            : "bg-gray-850 text-gray-300"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="body-2-semibold pt-2 text-gray-200">
                    {cinema.name}
                  </div>
                  <div className="body-2-semibold pb-2 text-gray-200">
                    {cinema.hall}
                  </div>
                  <div className="caption-1-medium mb-1 text-gray-400">
                    {cinema.address}
                  </div>
                  <div className="caption-1-medium mb-1 text-gray-400">
                    좌석 {cinema.seats} | {cinema.price}
                  </div>
                </div>

                <div className="relative z-20 h-30 w-30 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={cinema.image}
                    alt={cinema.hall}
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
