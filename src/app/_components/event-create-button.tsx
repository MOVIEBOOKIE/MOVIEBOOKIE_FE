import { PATHS } from "@/constants";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function EventCreateButton() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <div className="pointer-events-none relative mx-auto h-full max-w-md">
        <Link
          href={PATHS.EVENT_CREATE}
          className="bg-red-main body-3-semibold pointer-events-auto absolute right-5 bottom-31.5 flex items-center gap-1.5 rounded-full px-4 py-4 text-white focus:bg-red-700"
        >
          <PlusIcon size={18} />
          이벤트 만들기
        </Link>
      </div>
    </div>
  );
}
