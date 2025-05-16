"use client";

import { useState } from "react";
import dayjs from "dayjs";
import clsx from "clsx";
import { ArrowLeftIcon, ArrowRightIcon } from "@/icons/index";
const DAYS = ["일", "월", "화", "수", "목", "금", "토"];
interface CalendarProps {
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
}

const Calendar = ({ selectedDate, onSelectDate }: CalendarProps) => {
  const today = dayjs().startOf("day");
  const fourWeeksLater = today.add(4, "week");

  const [currentMonth, setCurrentMonth] = useState(
    dayjs().add(4, "week").startOf("month"),
  );

  const startDay = currentMonth.startOf("month").day();
  const daysInMonth = currentMonth.daysInMonth();
  const dates = Array.from({ length: daysInMonth }, (_, i) =>
    currentMonth.date(i + 1),
  );

  const handleSelect = (date: dayjs.Dayjs) => {
    if (date.isAfter(fourWeeksLater.subtract(1, "day"))) {
      onSelectDate(date.format("YYYY-MM-DD"));
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => prev.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => prev.add(1, "month"));
  };
  const isPrevDisabled = currentMonth.isSame(today, "month");

  return (
    <div className="mx-auto w-[335px] rounded-[10px] bg-gray-950 px-7.5 pt-5 pb-8 text-white">
      <div className="mb-8 flex items-center justify-center gap-5">
        <button
          onClick={handlePrevMonth}
          disabled={isPrevDisabled}
          className={clsx(
            "text-lg",
            isPrevDisabled ? "cursor-not-allowed text-gray-700" : "text-white",
          )}
        >
          <ArrowLeftIcon />
        </button>

        <div className="body-1-semibold text-white">
          {currentMonth.format("YYYY. M")}
        </div>

        <button onClick={handleNextMonth} className="text-lg text-white">
          <ArrowRightIcon />
        </button>
      </div>

      {/* Week Days */}
      <div className="body-3-regular mb-5 grid grid-cols-7 text-center text-gray-200">
        {DAYS.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 gap-3 pr-3 text-center">
        {Array.from({ length: startDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {dates.map((date) => {
          const isToday = date.isSame(today, "day");
          const isSelectable = date.isAfter(fourWeeksLater.subtract(1, "day"));
          const isSelected = selectedDate === date.format("YYYY-MM-DD");

          return (
            <button
              key={date.format("YYYY-MM-DD")}
              onClick={() => handleSelect(date)}
              disabled={!isSelectable}
              className={clsx(
                "flex h-10 w-10 items-center justify-center rounded-full",
                {
                  "text-red-main": isToday && !isSelected,
                  "bg-red-main text-white": isSelected,
                  "text-gray-850": !isSelectable,
                  "text-gray-400": isSelectable && !isSelected,
                },
              )}
            >
              {date.date()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
