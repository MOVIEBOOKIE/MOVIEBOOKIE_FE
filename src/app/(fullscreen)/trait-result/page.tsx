"use client";

import { Button } from "@/components";
import { PATH_IMAGES, PATHS } from "@/constants/index";
import { LogoWhiteIcon } from "@/icons/index";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export default function TraitResult() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const label = searchParams.get("label");
  const desc = searchParams.get("desc");
  const nickname = "서현";

  const handleClick = () => {
    router.push(PATHS.HOME);
  };

  return (
    <div className="relative flex h-screen w-full justify-center">
      <Image
        src={PATH_IMAGES.CUSTOM_BG}
        alt="배경"
        layout="fill"
        objectFit="cover"
        priority
      />
      <div
        className="absolute top-[22.4%] flex h-74 w-72.25 flex-col items-center rounded-[20px] bg-white/30 pb-4"
        style={{
          boxShadow: "0px 0px 80px 1px rgba(0, 0, 0, 0.20)",
          backdropFilter: "blur(22.5px)",
        }}
      >
        <p className="body-3-semibold mb-0.5 pt-15.25 text-gray-100">
          {nickname}님은
        </p>
        <p className="title-3-bold text-gray-white mb-3">{label}</p>
        <div className="bg-gray-white h-0.25 w-65.25 opacity-14" />
        <p className="body-3-regular mt-5 mb-7 text-center break-words whitespace-normal">
          {desc?.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </p>
        <LogoWhiteIcon width={30} height={30} />
      </div>
      <div className="absolute bottom-0 w-full max-w-125 px-5 pb-19">
        <Button onClick={handleClick}>무비부키 시작하기</Button>
      </div>
    </div>
  );
}
