"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@/icons/index";
import ReactPaginate from "react-paginate";

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
  return (
    <ReactPaginate
      forcePage={currentPage}
      onPageChange={(selected) => {
        onPageChange(selected.selected);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      pageCount={pageCount}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      previousLabel={<ArrowLeftIcon className="h-5 w-5 py-0.5" />}
      nextLabel={<ArrowRightIcon className="h-5 w-5 py-0.5" />}
      containerClassName="flex justify-center gap-5 mt-6 items-center"
      pageLinkClassName="flex items-center justify-center body-3-medium leading-none text-gray-500 px-2 cursor-pointer"
      activeLinkClassName="text-white body-3-medium"
      previousLinkClassName="flex items-center justify-center leading-none text-white body-3-medium cursor-pointer"
      nextLinkClassName="flex items-center justify-center leading-none text-white body-3-medium cursor-pointer"
      disabledClassName="pointer-events-none"
      disabledLinkClassName="text-gray-700 opacity-50 cursor-default"
    />
  );
}
