"use client";

import { useEffect } from "react";
import Modal from "../../../_components/modal";
import { ShareKakaoIcon, ShareLinkIcon } from "@/icons/index";
import { useToastStore } from "app/_stores/use-toast-store";

declare global {
  interface Window {
    Kakao: any;
  }
}

interface ShareModalProps {
  shareUrl: string;
  imageUrl: string;
  title: string;
  description: string;
  onClose: () => void;
}

export default function ShareModal({
  shareUrl,
  imageUrl,
  title,
  description,
  onClose,
}: ShareModalProps) {
  const showToast = useToastStore((state) => state.showToast);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    showToast("링크가 복사되었습니다!");
  };
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.Kakao &&
      !window.Kakao.isInitialized()
    ) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY!);
    }
  }, []);

  const handleKakaoShare = () => {
    if (!window.Kakao) return;

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: title,
        description: description,
        imageUrl: imageUrl,
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
      buttons: [
        {
          title: "이벤트 보러가기",
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
      ],
    });
  };

  return (
    <Modal
      title="링크 공유하기"
      onClose={onClose}
      hideButtons
      showCloseButton={true}
    >
      <p className="body-3-regular text-center text-gray-500">
        이벤트를 함께하고 싶은 친구에게 공유해보세요!
      </p>
      <div className="flex justify-center gap-7.5 pt-7">
        <button onClick={handleKakaoShare}>
          <ShareKakaoIcon />
        </button>
        <button onClick={handleCopyLink}>
          <ShareLinkIcon />
        </button>
      </div>
    </Modal>
  );
}
