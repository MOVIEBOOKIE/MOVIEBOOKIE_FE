"use client";
import { Button } from "@/components";
import { PATH_IMAGES, PATHS } from "@/constants/index";
import { LogoWhiteIcon } from "@/icons/index";
import { useUserStore } from "app/_stores/useUserStore";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TraitResult() {
  const router = useRouter();
  const handleClick = () => {
    router.push(PATHS.HOME);
  };
  const user = useUserStore((state) => state.user);
  const userName = user?.nickname ?? "회원";
  //TODO: 렌더링 문제 해결(유저 네임 깜빡임 문제)
  return (
    <div className="relative flex h-screen w-full items-center justify-center">
      <Image
        src={PATH_IMAGES.CUSTOM_BG}
        alt="배경"
        layout="fill"
        objectFit="cover"
        priority
      />
      <div
        className="absolute flex flex-col items-center"
        style={{ top: "7%" }}
      >
        <p className="body-3-semibold text-gray-100">{userName}님은</p>
        <p className="body-1-semibold mt-2.25 text-center">
          영화의 한 장면, 대사까지 곱씹으며
          <br />
          아주 깊게 보는 스타일이네요!
        </p>
        <div className="card-shadow-blur mt-10 flex h-96.5 w-72.25 flex-col items-center rounded-[20px] bg-white/30 px-3.5 pt-8.75 pb-4">
          <Image
            src={PATH_IMAGES.TRAIT.MOVIE_DETAIL_COLLECTOR}
            width={120}
            height={94}
            alt="type-image"
          />
          <p className="title-3-bold text-gray-white mb-3">
            디테일 수집형 영화 몰입러
          </p>
          <div className="bg-gray-white mt-5.5 h-0.25 w-full opacity-14" />
          <p className="body-3-regular mt-7.25 text-gray-100">
            스토리에 푹 빠져 정주행할 수 있는
            <br />
            이벤트들을 모아 추천해 드릴게요!
          </p>
          <LogoWhiteIcon
            width={30}
            height={30}
            className="absolute bottom-4 left-1/2 -translate-x-1/2"
          />
        </div>
      </div>
      <div className="fixed bottom-0 z-50 w-full max-w-125 px-5 pt-5 pb-12.5">
        <Button onClick={handleClick}>무비부키 시작하기</Button>
      </div>
    </div>
  );
}
