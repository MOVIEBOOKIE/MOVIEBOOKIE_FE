import {
  BallIcon,
  CamcorderIcon,
  PopcornIcon,
  SmileIcon,
  TelevisionIcon,
} from "@/icons/index";

export default function Step0() {
  return (
    <div className="relative w-93.75">
      <TelevisionIcon className="absolute top-27.5 left-27.5 rotate-13" />
      <SmileIcon className="absolute top-29.25 left-53" />
      <PopcornIcon className="absolute top-48.5 left-23 -rotate-15" />
      <BallIcon className="absolute top-42.5 left-41" />
      <CamcorderIcon className="absolute top-49.5 left-56.5" />
      <p className="title-1-bold text-gray-white absolute top-88 w-full text-center">
        규빈님을 위해 <br />
        간단한 테스트를 준비했어요
      </p>
      <p className="caption-1-medium absolute top-110.5 w-full text-center text-gray-500">
        테스트 후 규빈님께 꼭 맞는 이벤트들을 추천해드려요.
        <br /> 지금 바로 3가지 유형 테스트를 시작해볼까요?
      </p>
    </div>
  );
}
