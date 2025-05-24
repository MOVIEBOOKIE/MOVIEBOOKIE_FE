import { LogoWhiteIcon } from "@/icons/index";
import { Fragment } from "react";

export default function CardBack({ ticket }: { ticket: any }) {
  const cardInfo = [
    { label: "위치", value: ticket?.address },
    { label: "일시", value: ticket?.scheduledAt },
    { label: "시간", value: ticket?.time },
    { label: "인원", value: ticket?.participants, isSectionStart: true },
    { label: "가격", value: ticket?.price },
    { label: "주최", value: ticket?.hostName },
  ];

  return (
    <div className="card-shadow-blur absolute h-full w-full rotate-y-180 overflow-hidden rounded-[20px] bg-white/30 px-3.5 pb-4 backface-hidden">
      <h2 className="title-3-bold mt-17.25">{ticket?.title}</h2>
      <h3 className="caption-1-medium mt-0.5 text-gray-200">
        ({ticket?.type}) {ticket?.location}
      </h3>

      <div className="bg-gray-white mt-2.25 h-0.25 w-full opacity-14" />

      <div className="mt-5 grid grid-cols-[auto_1fr] gap-x-4.5 gap-y-2">
        {cardInfo.map(({ label, value, isSectionStart }) => {
          let displayValue = value;

          if (label === "가격" && typeof value === "number") {
            displayValue = `${value.toLocaleString()}원`;
          }

          if (label === "인원" && typeof value === "number") {
            displayValue = `모집인원 ${value}명`;
          }

          return (
            <Fragment key={label}>
              <p
                className={`caption-1-medium text-gray-200 ${
                  isSectionStart ? "mt-3" : ""
                }`}
              >
                {label}
              </p>
              <p
                className={`caption-1-regular text-gray-100 ${
                  isSectionStart ? "mt-3" : ""
                }`}
              >
                {displayValue}
              </p>
            </Fragment>
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
