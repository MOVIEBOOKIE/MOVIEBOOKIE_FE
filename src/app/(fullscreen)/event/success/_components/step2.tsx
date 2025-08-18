"use client";

import DetailContent from "@/components/detail-content";
import { useSelectedCinemaStore } from "app/_stores/use-selected-cinema-store";
import { useEventFormStore } from "app/_stores/use-event-create-form";
import { useUserStore } from "app/_stores/use-user-store";
import { formatDate } from "@/utils/format-date";
import { formatTime } from "@/utils/format-time";

export default function Step2() {
  const { formData } = useEventFormStore();
  const selectedCinema = useSelectedCinemaStore(
    (state) => state.selectedCinema,
  );
  const user = useUserStore((state) => state.user);

  console.log(user);

  const formattedFormData = {
    ...formData,
    eventDate: formData.eventDate ? formatDate(formData.eventDate) : "",
    recruitmentStart: formData.recruitmentStart
      ? formatDate(formData.recruitmentStart)
      : "",
    recruitmentEnd: formData.recruitmentEnd
      ? formatDate(formData.recruitmentEnd)
      : "",
    eventStartTime: formData.eventStartTime
      ? formatTime(formData.eventStartTime)
      : "",
  };

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
