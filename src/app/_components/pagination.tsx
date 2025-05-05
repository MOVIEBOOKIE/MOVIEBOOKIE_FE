"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@/icons/index";
import ReactPaginate from "react-paginate";

type Props = {
  pageCount: number;
  currentPage: number; // 현재 페이지 (0부터)
  onPageChange: (selected: number) => void;
};

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: Props) {
  const isPrevDisabled = currentPage === 0;
  const isNextDisabled = currentPage === pageCount - 1;

  return (
    <ReactPaginate
      forcePage={currentPage}
      onPageChange={(selected) => onPageChange(selected.selected)}
      pageCount={pageCount}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      previousLabel={
        <ArrowLeftIcon
          className={isPrevDisabled ? "text-gray-500" : "text-white"}
        />
      }
      nextLabel={
        <ArrowRightIcon
          className={isNextDisabled ? "text-gray-500" : "text-white"}
        />
      }
      containerClassName="flex justify-center gap-5 mt-7 mb-17 items-center"
      // 전체요소
      pageClassName=""
      // <a> 요소 (숫자 포함 버튼)
      pageLinkClassName="flex items-center justify-center body-3-medium leading-none text-gray-500 px-2"
      //  활성화된 <a>
      activeLinkClassName="text-white body-3-medium"
      // 이전/다음 버튼 (<a> 요소)
      previousLinkClassName="flex items-center justify-center leading-none text-gray-500 body-3-medium px-2"
      nextLinkClassName="flex items-center justify-center leading-none text-gray-500 body-3-medium px-2"
    />
  );
}
