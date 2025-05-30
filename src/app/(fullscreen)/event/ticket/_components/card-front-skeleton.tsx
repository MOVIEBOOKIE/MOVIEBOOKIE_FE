import { LogoWhiteIcon } from "@/icons/index";

export default function CardFrontSkeleton() {
  return (
    <div className="card-shadow-blur absolute h-full w-full animate-pulse overflow-hidden rounded-[20px] bg-white/30 p-3 opacity-48 backface-hidden">
      <div className="relative h-66.25 w-66.25 overflow-hidden rounded-lg bg-gray-300" />

      <div className="mt-5 h-6 w-3/4 rounded bg-gray-300 pl-0.5 opacity-48" />

      <div className="mt-2.5 grid grid-cols-3 gap-x-6 gap-y-1.5 pl-0.5">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className="flex flex-col items-start space-y-1">
            <div className="h-3 w-10 rounded bg-gray-300 opacity-48" />
            <div className="h-4 w-16 rounded bg-gray-300 opacity-48" />
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <LogoWhiteIcon width={30} height={30} className="opacity-30" />
      </div>
    </div>
  );
}
