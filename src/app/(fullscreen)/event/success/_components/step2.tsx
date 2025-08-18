"use client";

import DetailContent from "@/components/detail-content";
import { useSelectedCinemaStore } from "app/_stores/use-selected-cinema-store";
import { useEventFormStore } from "app/_stores/use-event-create-form";
import { useUserStore } from "app/_stores/use-user-store";
import { formatDateWithDay } from "@/utils/date-util";

export default function Step2() {
  const { formData } = useEventFormStore();
  const selectedCinema = useSelectedCinemaStore(
    (state) => state.selectedCinema,
  );
  const user = useUserStore((state) => state.user);

  const formattedFormData = {
    ...formData,
    eventDate: formData.eventDate ? formatDateWithDay(formData.eventDate) : "",
    recruitmentStart: formData.recruitmentStart
      ? formatDateWithDay(formData.recruitmentStart)
      : "",
    recruitmentEnd: formData.recruitmentEnd
      ? formatDateWithDay(formData.recruitmentEnd)
      : "",
  };
  console.log(formattedFormData);

  return (
    <div className="mt-3">
      <DetailContent
        {...formattedFormData}
        {...(selectedCinema || {})}
        {...user}
      />
    </div>
  );
}
