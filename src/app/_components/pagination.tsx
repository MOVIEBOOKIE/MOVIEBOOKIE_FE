"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@/icons/index";

type Props = {
  pageCount: number;
  currentPage: number; // 현재 페이지 (0부터 시작)
  onPageChange: (selected: number) => void;
};

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: Props) {
  const VISIBLE = Math.min(5, pageCount);

  const goTo = (n: number) => {
    if (n < 0 || n > pageCount - 1) return;
    onPageChange(n);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="mt-6 flex items-center justify-center gap-5">
      <button
        type="button"
        aria-label="이전 페이지"
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage === 0}
        className={`body-3-medium flex items-center justify-center leading-none ${
          currentPage === 0
            ? "pointer-events-none cursor-default text-gray-700 opacity-50"
            : "cursor-pointer text-white"
        }`}
      >
        <ArrowLeftIcon className="h-5 w-5 py-0.5" />
      </button>

      {Array.from({ length: VISIBLE }).map((_, i) => {
        const pageIndex = i; // 0-based
        const isActive = currentPage === pageIndex;
        return (
          <button
            key={pageIndex}
            type="button"
            onClick={() => goTo(pageIndex)}
            className={`body-3-medium flex cursor-pointer items-center justify-center px-2 leading-none ${
              isActive ? "text-white" : "text-gray-500"
            }`}
          >
            {pageIndex + 1}
          </button>
        );
      })}

      <button
        type="button"
        aria-label="다음 페이지"
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage >= pageCount - 1}
        className={`body-3-medium flex items-center justify-center leading-none ${
          currentPage >= pageCount - 1
            ? "pointer-events-none cursor-default text-gray-700 opacity-50"
            : "cursor-pointer text-white"
        }`}
      >
        <ArrowRightIcon className="h-5 w-5 py-0.5" />
      </button>
    </div>
  );
}
