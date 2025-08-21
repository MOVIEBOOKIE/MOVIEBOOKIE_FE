import dayjs, { Dayjs } from "dayjs";
export type RowBlock = { row: number; startIdx: number; endIdx: number };

// 날짜의 시작 시간을 반환 함수
export function startOfDay(d: Dayjs) {
  return d.startOf("day");
}

// 이벤트 날짜 기준, 지정된 주(weeks)만큼 이전 날짜를 계산
export function getLatestDeadline(eventDate: string, weeks = 2) {
  return startOfDay(dayjs(eventDate)).subtract(weeks, "week");
}

// 주어진 날짜가 선택 가능한 범위(오늘 ~ 마감일)에 속하는지 판단
export function isSelectableDate(
  d: Dayjs,
  today: Dayjs,
  latestDeadline: Dayjs,
) {
  // 오늘 포함 ~ latestDeadline(포함) 사이만 선택 가능
  return (
    d.isSame(today, "day") ||
    (d.isAfter(today, "day") && d.isBefore(latestDeadline.add(1, "day"), "day"))
  );
}

// 마감일 범위를 반환
export function getDeadlineRange(
  eventDate: string,
  now: Dayjs = dayjs(),
  weeks = 2,
) {
  const today = startOfDay(now);
  const latest = getLatestDeadline(eventDate, weeks);
  return {
    min: today,
    max: latest,
    isSelectable: latest.isSame(today, "day") || latest.isAfter(today, "day"),
  };
}

/**
 * 월 그리드(앞쪽 공백 + 1..말일)에서 특정 날짜의 인덱스 반환
 * - 일요일=0 기준
 */
export function dateToGridIndex(currentMonth: Dayjs, dateInSameMonth: Dayjs) {
  const startDay = currentMonth.startOf("month").day(); // 0..6
  const dayOfMonth = dateInSameMonth.date(); // 1..n
  return startDay + (dayOfMonth - 1);
}

/**
 * 현재 월 캘린더 안에서 "today ~ selectedDeadline" 구간을
 * 행(row) 단위 블록으로 나눠 반환 (DOM 측정 없이 인덱스만)
 */
export function computeRowBlocksForMonth(
  currentMonth: Dayjs,
  selectedDeadline: string | null,
  now: Dayjs = dayjs(),
): RowBlock[] {
  if (!selectedDeadline) return [];

  const today = startOfDay(now);
  const monthStart = currentMonth.startOf("month");
  const monthEnd = currentMonth.endOf("month");

  const periodStart = today; // 오늘부터
  const periodEnd = dayjs(selectedDeadline).endOf("day");

  const visible =
    monthEnd.isAfter(periodStart) && monthStart.isBefore(periodEnd);
  if (!visible) return [];

  // 월 내에서 시작/끝 인덱스 (경계는 월로 클램프)
  const startInMonth = monthStart.isAfter(periodStart)
    ? monthStart
    : periodStart;
  const endInMonth = monthEnd.isBefore(periodEnd) ? monthEnd : periodEnd;

  // 월 범위 밖이면 빈 배열
  if (startInMonth.isAfter(endInMonth)) return [];

  const startIdx = dateToGridIndex(currentMonth, startInMonth);
  const endIdx = dateToGridIndex(currentMonth, endInMonth);

  const startRow = Math.floor(startIdx / 7);
  const endRow = Math.floor(endIdx / 7);

  const blocks: RowBlock[] = [];
  for (let row = startRow; row <= endRow; row++) {
    const rowStart = row === startRow ? startIdx : row * 7;
    const rowEnd = row === endRow ? endIdx : row * 7 + 6;
    blocks.push({ row, startIdx: rowStart, endIdx: rowEnd });
  }
  return blocks;
}
