import { LogoWhiteIcon } from "@/icons/index";

export default function CardBack() {
  return (
    <div className="card-shadow-blur absolute h-full w-full rotate-y-180 overflow-hidden rounded-[20px] bg-white/30 px-3.5 backface-hidden">
      <h2 className="title-3-bold mt-17.25">빌리 엘리어트</h2>
      <h3 className="caption-1-medium mt-0.5 text-gray-200">
        (영화) 신촌 아트레온
      </h3>
      <div className="bg-gray-white mt-2.25 h-0.25 w-full opacity-14" />

      <div className="mt-5 grid grid-cols-[auto_1fr] gap-x-4.5 gap-y-2">
        <p className="caption-1-medium text-gray-200">위치</p>
        <p className="caption-1-regular text-gray-100">
          서울특별시 어쩌구 저쩌구 무슨로
        </p>
        <p className="caption-1-medium text-gray-200">일시</p>
        <p className="caption-1-regular text-gray-100">2025. 05. 26 (일)</p>
        <p className="caption-1-medium text-gray-200">시간</p>
        <p className="caption-1-regular text-gray-100">18:00~20:24</p>
        <p className="caption-1-medium mt-3 text-gray-200">인원</p>
        <p className="caption-1-regular text-gray-100">모집인원 24명</p>
        <p className="caption-1-medium text-gray-200">가격</p>
        <p className="caption-1-regular text-gray-100">24,000원</p>
        <p className="caption-1-medium text-gray-200">주최</p>
        <p className="caption-1-regular text-gray-100">김서현</p>
      </div>
      <LogoWhiteIcon
        width={30}
        height={30}
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
      />
    </div>
  );
}
