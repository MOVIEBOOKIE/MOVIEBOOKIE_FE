import { MOCK_IMAGES } from "@/constants/path-images";
import { LogoWhiteIcon } from "@/icons/index";
import Image from "next/image";

export default function CardFront() {
  return (
    <div className="card-shadow-blur absolute h-full w-full overflow-hidden rounded-[20px] bg-white/30 p-3 backface-hidden">
      <div className="relative h-66.25 w-66.25 overflow-hidden">
        <Image
          src={MOCK_IMAGES.IMAGE_1}
          fill
          alt="ticket-image"
          className="rounded-lg object-cover"
        />
      </div>
      <p className="title-3-bold mt-5 pl-0.5">빌리 엘리어트</p>
      <div className="mt-2.5 grid grid-cols-3 gap-x-6 gap-y-1.5 pl-0.5">
        <h2 className="caption-3-medium opacity-48">일시</h2>
        <p className="caption-3-medium opacity-48">장소</p>
        <p className="caption-3-medium opacity-48">예상 금액</p>
        <p className="caption-1-medium opacity-48">2025. 05. 26</p>
        <p className="caption-1-medium opacity-48">신촌 아트레온</p>
        <p className="caption-1-medium opacity-48">24,000원</p>
      </div>
      <LogoWhiteIcon
        width={30}
        height={30}
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
      />
    </div>
  );
}
