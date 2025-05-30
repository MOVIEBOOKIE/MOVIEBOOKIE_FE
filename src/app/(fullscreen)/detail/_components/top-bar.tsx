"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { BackIcon, UploadIcon } from "@/icons/index";
import ShareModal from "./share-modal";
import { useState } from "react";

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

  const handleBack = () => {
    const from = searchParams.get("from");

    if (from === "event") {
      router.push("/event");
    } else if (from === "home") {
      router.push("/?to=category");
    } else {
      router.back();
    }
  };

  return (
    <>
      <div className="fixed z-10 mx-auto w-full max-w-125">
        <button
          type="button"
          className="absolute top-2.5 left-5 h-9.5 w-9.5 rounded-full bg-gray-950"
          onClick={handleBack}
        >
          <BackIcon />
        </button>
        <button
          type="button"
          className="absolute top-2.5 right-5 h-9.5 w-9.5 rounded-full bg-gray-950"
          onClick={() => setShowShareModal(true)}
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
