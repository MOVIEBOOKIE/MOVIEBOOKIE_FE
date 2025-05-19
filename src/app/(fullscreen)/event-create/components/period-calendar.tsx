"use client";

import { useRef, useState } from "react";
import dayjs from "dayjs";
import clsx from "clsx";
import { ArrowLeftIcon, ArrowRightIcon } from "@/icons/index";

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

interface DeadlineCalendarProps {
  eventDate: string; // YYYY-MM-DD
  selectedDeadline: string | null;
  onSelectDeadline: (date: string) => void;
}

const DeadlineCalendar = ({
  eventDate,
  selectedDeadline,
  onSelectDeadline,
}: DeadlineCalendarProps) => {
  const today = dayjs().startOf("day");
  const event = dayjs(eventDate);
  const latestDeadline = event.subtract(2, "week"); // 최대 마감일: 이벤트 날짜 기준 -2주

  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);

  const startDay = currentMonth.startOf("month").day(); // Sunday = 0
  const daysInMonth = currentMonth.daysInMonth();
  const dates = Array.from({ length: daysInMonth }, (_, i) =>
    currentMonth.date(i + 1),
  );
  const fullGrid: (dayjs.Dayjs | null)[] = [
    ...Array(startDay).fill(null),
    ...dates,
  ];

  const handleSelect = (date: dayjs.Dayjs) => {
    if (
      date.isSame(today) ||
      (date.isAfter(today) && date.isBefore(latestDeadline.add(1, "day")))
    ) {
      onSelectDeadline(date.format("YYYY-MM-DD"));
    }
  };

  const isPrevDisabled = currentMonth.isSame(today, "month");

  const barBlocks: { row: number; startIdx: number; endIdx: number }[] = [];
  if (selectedDeadline) {
    const deadline = dayjs(selectedDeadline);

    const startIndex = fullGrid.findIndex(
      (d) => d && d.isSame(today, "day") && d.isSame(currentMonth, "month"),
    );
    const endIndex = fullGrid.findIndex(
      (d) => d && d.isSame(deadline, "day") && d.isSame(currentMonth, "month"),
    );

    const firstIdxInMonth = fullGrid.findIndex(
      (d) => d && d.isSame(currentMonth.startOf("month"), "month"),
    );
    const lastIdxInMonth = fullGrid.reduce((acc, d, i) => {
      if (d && d.isSame(currentMonth, "month")) return i;
      return acc;
    }, -1);

    if (firstIdxInMonth !== -1 && lastIdxInMonth !== -1) {
      const startIdx = Math.max(startIndex, firstIdxInMonth);
      const endIdx = Math.min(endIndex, lastIdxInMonth);
      const startRow = Math.floor(startIdx / 7);
      const endRow = Math.floor(endIdx / 7);

      for (let row = startRow; row <= endRow; row++) {
        const start = row === startRow ? startIdx : row * 7;
        const end = row === endRow ? endIdx : row * 7 + 6;
        barBlocks.push({ row, startIdx: start, endIdx: end });
      }
    }
  }

  return (
    <div className="mx-auto w-[335px] rounded-[10px] bg-gray-950 px-7.5 pt-5 pb-8 text-white">
      <div className="body-3-regular mb-8 flex items-center justify-center gap-5">
        <button
          onClick={() => setCurrentMonth((prev) => prev.subtract(1, "month"))}
          disabled={isPrevDisabled}
          className={clsx(
            "text-lg",
            isPrevDisabled
              ? "cursor-not-allowed text-gray-700"
              : "text-gray-200",
          )}
        >
          <ArrowLeftIcon />
        </button>
        <div className="body-1-semibold text-white">
          {currentMonth.format("YYYY. M")}
        </div>
        <button
          onClick={() => setCurrentMonth((prev) => prev.add(1, "month"))}
          className="text-lg text-gray-200"
        >
          <ArrowRightIcon />
        </button>
      </div>

      {/* 요일 */}
      <div className="body-3-regular mb-5 grid grid-cols-7 text-center text-gray-200">
        {DAYS.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* 날짜 셀 */}
      <div className="relative grid grid-cols-7 gap-x-0 gap-y-3 text-center text-gray-300">
        {/* 회색 막대 */}
        {barBlocks.map(({ row, startIdx, endIdx }) => {
          const startEl = cellRefs.current[startIdx];
          const endEl = cellRefs.current[endIdx];
          if (!startEl || !endEl) return null;

          const top = startEl.offsetTop;
          const left = startEl.offsetLeft;
          const width = endEl.offsetLeft + endEl.offsetWidth - left;

          return (
            <div
              key={`bar-${row}`}
              className="bg-red-main absolute z-0 h-10 rounded-full"
              style={{ top, left, width }}
            />
          );
        })}

        {fullGrid.map((day, index) => {
          if (!day) return <div key={`empty-${index}`} className="h-10 w-10" />;

          const current = day;
          const isSelectable =
            current.isSame(today) ||
            (current.isAfter(today) &&
              current.isBefore(latestDeadline.add(1, "day")));

          const isDisabled = !isSelectable;
          const isSelected = selectedDeadline === current.format("YYYY-MM-DD");
          const isStart = current.isSame(today, "day");
          const isEnd = isSelected;
          const showRedDot = isStart || isEnd;

          return (
            <div
              key={current.format("YYYY-MM-DD")}
              ref={(el) => {
                cellRefs.current[index] = el;
              }}
              className="relative flex h-10 w-10 items-center justify-center"
            >
              {showRedDot && (
                <div className="bg-red-main absolute inset-0 z-10 rounded-full text-white" />
              )}
              <button
                onClick={() => handleSelect(current)}
                disabled={isDisabled}
                className={clsx(
                  "body-3-regular absolute z-30 flex h-10 w-10 items-center justify-center",
                  {
                    "text-gray-200": !isDisabled,
                    "text-gray-850": isDisabled,
                  },
                )}
              >
                {current.date()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeadlineCalendar;
