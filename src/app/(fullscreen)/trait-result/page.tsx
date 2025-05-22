import { Button } from "@/components";
import { LineBreak } from "@/components/line-break";
import { PATH_IMAGES, PATHS } from "@/constants/index";
import { LogoWhiteIcon } from "@/icons/index";
import { useGetUserTypeResult } from "app/_hooks/use-user-type";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TraitResult() {
  const router = useRouter();
  const handleClick = () => {
    router.push(PATHS.HOME);
  };
  // const user = useUserStore((state) => state.user);
  // const userName = user?.nickname ?? "회원";
  //TODO: 렌더링 문제 해결(유저 네임 깜빡임 문제)

  const { data } = useGetUserTypeResult();

  const imageSrc =
    data?.userTypeCode &&
    PATH_IMAGES.TRAIT[data.userTypeCode as keyof typeof PATH_IMAGES.TRAIT];
  return (
    <div className="relative flex h-screen w-full items-center justify-center">
      <Image
        src={PATH_IMAGES.TRAIT.BACKGROUND}
        alt="배경"
        layout="fill"
        objectFit="cover"
        priority
      />
      <div
        className="absolute flex flex-col items-center"
        style={{ top: "7%" }}
      >
        {/* <p className="body-3-semibold text-gray-100">{userName}님은</p> */}
        <p className="body-1-semibold mt-2.25 text-center">
          <LineBreak text={data?.label} />
        </p>
        <div className="card-shadow-blur mt-10 flex h-96.5 w-72.25 flex-col items-center rounded-[20px] bg-white/30 px-3.5 pt-8.75 pb-4">
          {imageSrc && (
            <Image src={imageSrc} width={120} height={94} alt="type-image" />
          )}

          <p className="title-3-bold text-gray-white mb-3">
            <LineBreak text={data?.title} />
          </p>
          <div className="bg-gray-white mt-5.5 h-0.25 w-full opacity-14" />
          <p className="body-3-regular mt-7.25 text-center text-gray-100">
            <LineBreak text={data?.description} />
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
