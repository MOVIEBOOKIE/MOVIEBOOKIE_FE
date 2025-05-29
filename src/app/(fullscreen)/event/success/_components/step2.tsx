"use client";

import DetailContent from "@/components/detail-content";
import { useSelectedCinemaStore } from "app/_stores/use-selected-cinema-store";
import { useEventFormStore } from "app/_stores/use-event-create-form";
import { useUserStore } from "app/_stores/use-user-store";

export default function Step2() {
  const { formData } = useEventFormStore();
  const selectedCinema = useSelectedCinemaStore(
    (state) => state.selectedCinema,
  );
  const user = useUserStore((state) => state.user);

  return (
    <div className="mt-3">
      <DetailContent {...formData} {...(selectedCinema || {})} {...user} />
    </div>
  );
}
