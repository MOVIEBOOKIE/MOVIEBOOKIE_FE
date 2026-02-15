"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import dayjs from "dayjs";
import clsx from "clsx";
import { ArrowLeftIcon, ArrowRightIcon } from "@/icons/index";
import Toast from "@/components/toast";

import {
  isSelectableDate,
  getLatestDeadline,
  computeRowBlocksForMonth,
} from "@/utils/deadline-utils";

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];
//TODO: 테스트를 위한 기존코드 주석 처리

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
  // FIX: const latestDeadline = event.subtract(2, "week");
  const latestDeadline = event;

  const [currentMonth, setCurrentMonth] = useState(() =>
    selectedDeadline ? dayjs(selectedDeadline).startOf("month") : dayjs(),
  );
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [barBlocks, setBarBlocks] = useState<
    { row: number; startIdx: number; endIdx: number }[]
  >([]);
  const [showToast, setShowToast] = useState(false);
  const startDay = currentMonth.startOf("month").day();
  const daysInMonth = currentMonth.daysInMonth();
  const dates = Array.from({ length: daysInMonth }, (_, i) =>
    currentMonth.date(i + 1),
  );
  const fullGrid: (dayjs.Dayjs | null)[] = [
    ...Array(startDay).fill(null),
    ...dates,
  ];

  const handleSelect = (date: dayjs.Dayjs) => {
    if (isSelectableDate(date, today, latestDeadline)) {
      onSelectDeadline(date.format("YYYY-MM-DD"));
    } else {
      setShowToast(true);
    }
  };

  const isPrevDisabled = currentMonth.isSame(today, "month");

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showToast]);

  useEffect(() => {
    const newBarBlocks = computeRowBlocksForMonth(
      currentMonth,
      selectedDeadline,
      today,
    );
    setBarBlocks(newBarBlocks);
  }, [selectedDeadline, currentMonth, today]);

  return (
    <div className="relative mx-auto w-[335px] rounded-[10px] bg-gray-950 px-7.5 pt-5 pb-8 text-white">
      {showToast && (
        <div className="fixed bottom-32 left-1/2 z-50 -translate-x-1/2">
          <Toast iconType="alert">
            진행일 기준, 최대 2주 전까지만 설정할 수 있어요
          </Toast>
        </div>
      )}
      <div className="body-3-regular mb-8 flex items-center justify-center gap-5">
        <button
          type="button"
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
          type="button"
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
          // 유틸 함수를 사용하여 선택 가능 여부 판단
          const isSelectable = isSelectableDate(current, today, latestDeadline);

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
                type="button"
                onClick={() => handleSelect(current)}
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
