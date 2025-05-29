"use client";

import DetailContent from "@/components/detail-content";
import { useSelectedCinemaStore } from "app/_stores/use-selected-cinema-store";
import { useEventFormStore } from "app/_stores/use-event-create-form";

export default function Step2() {
  const { formData } = useEventFormStore();
  const selectedCinema = useSelectedCinemaStore(
    (state) => state.selectedCinema,
  );

  return (
    <div className="mt-3">
      <DetailContent {...formData} {...(selectedCinema || {})} />
    </div>
  );
}
