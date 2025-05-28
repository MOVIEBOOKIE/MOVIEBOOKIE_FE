"use client";

import ShareModal from "app/(fullscreen)/detail/_components/share-modal";
import { PATHS } from "@/constants";
import { BackIcon, UploadIcon } from "@/icons/index";
import { useRouter } from "next/navigation";
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
  const [showShareModal, setShowShareModal] = useState(false);

  const handleBack = () => {
    router.back();
  };
  const handleShare = () => {
    setShowShareModal(true);
  };
  return (
    <>
      {" "}
      <div className="fixed z-10 mx-auto w-full max-w-125">
        <button
          type="button"
          className="absolute top-2.5 left-5 h-9.5 w-9.5 rounded-full bg-gray-950"
          aria-label="Back"
          onClick={handleBack}
        >
          <BackIcon />
        </button>
        <button
          type="button"
          className="absolute top-2.5 right-5 flex h-9.5 w-9.5 items-center justify-center rounded-full bg-gray-950"
          aria-label="Upload"
          onClick={handleShare}
        >
          <UploadIcon />
        </button>
      </div>
      {showShareModal && (
        <ShareModal
          shareUrl={`https://movie-bookie.shop${event.eventId}`}
          imageUrl={event.posterImageUrl}
          title={event.title}
          description={event.description}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </>
  );
}
