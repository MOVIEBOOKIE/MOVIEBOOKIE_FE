"use client";

import DetailContent from "@/components/detail-content";
import { useEventFormStore } from "app/_stores/useEventCreateForm";

export default function Step2() {
  const { formData } = useEventFormStore();

  return (
    <div className="mt-3">
      <DetailContent {...formData} />
    </div>
  );
}
