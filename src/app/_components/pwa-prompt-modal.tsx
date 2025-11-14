"use client";

import { getMobile } from "@/utils/get-mobile";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CloseIcon, ShareIcon } from "@/icons/index";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function PwaPromptModal() {
  const [showModal, setShowModal] = useState(false);
  const [os, setOs] = useState<"android" | "ios" | "other">("other");
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const osType = getMobile(); // ios | android | other
    setOs(osType);

    const pathname = window.location.pathname;
    const isLoginPage = pathname === "/login";

    // PWA 환경인지 체크
    const isInstalledPWA =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as any).standalone === true;

    if (isInstalledPWA) {
      return;
    }
    // iOS Safari 체크
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosSafari =
      osType === "ios" &&
      userAgent.includes("safari") &&
      !userAgent.includes("crios") && // iOS Chrome
      !userAgent.includes("fxios"); // iOS Firefox
    if (isIosSafari && isLoginPage) {
      setShowModal(true);
      return;
    }

    // android
    const hasPrompted = localStorage.getItem("pwaPrompted");
    if (hasPrompted) return;

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);
      setShowModal(true);
    };

    if (osType === "android") {
      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      return () => {
        window.removeEventListener(
          "beforeinstallprompt",
          handleBeforeInstallPrompt,
        );
      };
    } else if (osType === "ios") {
      // iOS는 beforeinstallprompt가 없으므로 바로 모달 보여줌
      setShowModal(true);
    }
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        localStorage.setItem("pwaPrompted", "true");
        setShowModal(false);
        setDeferredPrompt(null);
      }
    }
  };

  const handleClose = () => {
    localStorage.setItem("pwaPrompted", "true");
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.7)]">
      <div className="fixed right-5 bottom-10 left-5 mx-auto max-w-md rounded-2xl bg-gray-900 px-5 text-center text-white shadow-xl">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400"
        >
          <CloseIcon />
        </button>

        <div className="mt-9 mb-4 flex flex-col items-center">
          <Image
            src="/images/favicon/196x196.png"
            alt="앱 아이콘"
            width={64}
            height={64}
          />
        </div>

        {os === "android" ? (
          <>
            <h2 className="body-2-semibold mt-4.5 mb-5 text-gray-300">
              홈화면에{" "}
              <span className="body-2-semibold text-gray-100">무비부키 앱</span>
              을 추가하면 <br /> 더 편리하게 서비스를 이용할 수 있어요
            </h2>
            <button
              onClick={handleInstall}
              className="bg-red-main body-2-semibold mt-4.2 w-full rounded-lg py-3 text-white"
            >
              홈 화면에 추가
            </button>
            <button
              onClick={handleClose}
              className="caption-1-regular mt-3 mb-4.5 w-full text-gray-500 underline"
            >
              오늘은 웹으로 볼게요
            </button>
          </>
        ) : (
          <>
            <h2 className="body-2-semibold mt-4 mb-5 text-gray-300">
              하단의{" "}
              <span className="inline-flex items-center">
                <ShareIcon className="h-5 w-5" />
              </span>
              <span className="body-2-semibold text-gray-100"> 버튼</span>
              을 누른 후, <br />
              <span className="body-2-semibold text-gray-100">
                홈 화면에 추가하기
              </span>
              를 선택하면 <br />더 편리하게 서비스를 이용할 수 있어요!
            </h2>
            <button
              onClick={handleClose}
              className="caption-1-regular mb-7.5 w-full text-gray-500 underline"
            >
              오늘은 웹으로 볼게요
            </button>
          </>
        )}
      </div>
    </div>
  );
}
