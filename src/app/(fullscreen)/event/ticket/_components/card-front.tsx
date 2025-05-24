import { LogoWhiteIcon } from "@/icons/index";
import Image from "next/image";

export default function CardFront({ ticket }: { ticket: any }) {
  const infoData = [
    { label: "일시", value: ticket?.scheduledAt },
    { label: "장소", value: ticket?.location },
    { label: "예상 금액", value: ticket?.price },
  ];

  return (
    <div className="card-shadow-blur absolute h-full w-full overflow-hidden rounded-[20px] bg-white/30 p-3 backface-hidden">
      <div className="relative h-66.25 w-66.25 overflow-hidden">
        <Image
          src={ticket?.eventImageUrl}
          fill
          alt="ticket-image"
          className="rounded-lg object-cover"
        />
      </div>
      <p className="title-3-bold mt-5 pl-0.5">{ticket?.title}</p>
      <div className="mt-2.5 grid grid-cols-3 gap-x-6 gap-y-1.5 pl-0.5">
        {infoData.map(({ label, value }) => {
          const displayValue =
            label === "예상 금액" && typeof value === "number"
              ? `${value.toLocaleString()}원`
              : value;

          return (
            <div key={label} className="flex flex-col items-start">
              <h2 className="caption-3-medium opacity-48">{label}</h2>
              <p className="caption-1-medium opacity-48">{displayValue}</p>
            </div>
          );
        })}
      </div>

      <LogoWhiteIcon
        width={30}
        height={30}
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
      />
    </div>
  );
}
