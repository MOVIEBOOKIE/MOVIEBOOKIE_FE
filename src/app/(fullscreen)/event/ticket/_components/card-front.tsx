import { MOCK_IMAGES } from "@/constants/path-images";
import { LogoWhiteIcon } from "@/icons/index";
import Image from "next/image";
import { Fragment } from "react";

const infoData = [
  { label: "일시", value: "2025. 05. 26" },
  { label: "장소", value: "신촌 아트레온" },
  { label: "예상 금액", value: "24,000원" },
];

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
        {infoData.map(({ label, value }) => (
          <Fragment key={label}>
            <h2 className="caption-3-medium opacity-48">{label}</h2>
          </Fragment>
        ))}
        {infoData.map(({ label, value }) => (
          <p key={label} className="caption-1-medium opacity-48">
            {value}
          </p>
        ))}
      </div>

      <LogoWhiteIcon
        width={30}
        height={30}
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
      />
    </div>
  );
}
