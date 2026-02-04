"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { BackIcon, UploadIcon } from "@/icons/index";
import ShareModal from "./share-modal";
import { useState, useMemo } from "react";

interface TopBarProps {
  event: {
    eventId: number;
    posterImageUrl: string;
    title: string;
    description: string;
  };
}

export default function TopBar({ event }: TopBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showShareModal, setShowShareModal] = useState(false);

  const from = useMemo(() => searchParams.get("from"), [searchParams]);
  const tab = useMemo(() => searchParams.get("tab"), [searchParams]);
  const toggle = useMemo(() => searchParams.get("toggle"), [searchParams]);

  const handleBack = () => {
    if (from === "event") {
      const query = new URLSearchParams();
      if (tab) query.set("tab", tab);
      if (toggle) query.set("toggle", toggle);
      router.push(`/event?${query.toString()}`);
    } else {
      router.back();
    }
  };

  return (
    <>
      <div className="fixed-overlay-safe fixed z-100 mx-auto mt-4 w-full max-w-125">
        <button
          type="button"
          className="absolute top-4 left-3 h-9.5 w-9.5 rounded-full bg-gray-950"
          onClick={handleBack}
        >
          <BackIcon />
        </button>
        <button
          type="button"
          onClick={() => setShowShareModal(true)}
          className="absolute top-4 right-5 flex h-9.5 w-9.5 items-center justify-center rounded-full bg-gray-950"
        >
          <UploadIcon />
        </button>
      </div>
      {showShareModal && (
        <ShareModal
          shareUrl={`https://movie-bookie.shop/detail/${event.eventId}`}
          imageUrl={event.posterImageUrl}
          title={event.title}
          description={event.description}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </>
  );
}
