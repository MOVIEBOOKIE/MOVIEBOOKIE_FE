import {
  BallIcon,
  CamcorderIcon,
  PopcornIcon,
  SmileIcon,
  TelevisionIcon,
} from "@/icons/index";

interface Step0Props {
  nickname: string;
}

export default function Step0({ nickname }: Step0Props) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute left-1/2 h-full w-93.75 -translate-x-1/2">
        <TelevisionIcon className="absolute top-27.5 left-27.5 h-12 w-12 rotate-13" />
        <SmileIcon className="absolute top-29.25 left-53 h-12 w-12" />
        <PopcornIcon className="absolute top-48.5 left-23 h-12 w-12 -rotate-15" />
        <BallIcon className="absolute top-42.5 left-41 h-12 w-12" />
        <CamcorderIcon className="absolute top-49.5 left-56.5 h-12 w-12" />
      </div>
      <div className="mt-80 w-full text-center">
        <p className="title-1-bold text-gray-white">
          {nickname}님을 위해 <br />
          간단한 테스트를 준비했어요
        </p>
        <p className="caption-1-medium mt-6 text-gray-500">
          테스트 후 {nickname}님께 꼭 맞는 이벤트들을 추천해드려요.
          <br /> 지금 바로 3가지 유형 테스트를 시작해볼까요?
        </p>
      </div>
    </div>
  );
}
