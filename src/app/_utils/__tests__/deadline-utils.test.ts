import dayjs from "dayjs";
import {
  startOfDay,
  getLatestDeadline,
  isSelectableDate,
  getDeadlineRange,
  dateToGridIndex,
  computeRowBlocksForMonth,
  RowBlock,
} from "@/utils/deadline-utils";

describe("날짜 유틸리티 함수 테스트", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-11-01T00:00:00.000Z"));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("startOfDay: 날짜의 시작 시간을 올바르게 반환한다", () => {
    const d = dayjs("2024-11-01T15:30:00");
    expect(startOfDay(d).format("YYYY-MM-DD HH")).toBe("2024-11-01 00");
  });

  it("getLatestDeadline: 이벤트 날짜의 2주 전을 올바르게 계산한다", () => {
    const eventDate = "2024-11-15";
    const latestDeadline = getLatestDeadline(eventDate);
    expect(latestDeadline.format("YYYY-MM-DD")).toBe("2024-11-01");
  });

  describe("isSelectableDate: 선택 가능한 날짜를 올바르게 판단한다", () => {
    const today = dayjs("2024-11-01");
    const latestDeadline = dayjs("2024-11-15");

    it("오늘 날짜는 선택 가능하다", () => {
      expect(isSelectableDate(dayjs("2024-11-01"), today, latestDeadline)).toBe(
        true,
      );
    });

    it("오늘 이후 ~ 마감일 이전은 선택 가능하다", () => {
      expect(isSelectableDate(dayjs("2024-11-05"), today, latestDeadline)).toBe(
        true,
      );
    });

    it("마감일은 선택 가능하다", () => {
      expect(isSelectableDate(dayjs("2024-11-15"), today, latestDeadline)).toBe(
        true,
      );
    });

    it("오늘 이전 날짜는 선택 불가능하다", () => {
      expect(isSelectableDate(dayjs("2024-10-31"), today, latestDeadline)).toBe(
        false,
      );
    });

    it("마감일 이후 날짜는 선택 불가능하다", () => {
      expect(isSelectableDate(dayjs("2024-11-16"), today, latestDeadline)).toBe(
        false,
      );
    });
  });

  it("getDeadlineRange: 마감일 범위를 올바르게 반환한다", () => {
    const eventDate = "2024-11-15";
    const range = getDeadlineRange(eventDate);
    expect(range.min.format("YYYY-MM-DD")).toBe("2024-11-01");
    expect(range.max.format("YYYY-MM-DD")).toBe("2024-11-01");
    expect(range.isSelectable).toBe(true);
  });

  it("dateToGridIndex: 날짜가 캘린더 그리드의 올바른 인덱스를 반환한다", () => {
    const currentMonth = dayjs("2024-11-01");
    expect(dateToGridIndex(currentMonth, dayjs("2024-11-01"))).toBe(5);
    expect(dateToGridIndex(currentMonth, dayjs("2024-11-02"))).toBe(6);
    expect(dateToGridIndex(currentMonth, dayjs("2024-11-03"))).toBe(7);
  });

  describe("computeRowBlocksForMonth: 월별 하이라이트 블록을 올바르게 계산한다", () => {
    it("선택된 마감일이 없으면 빈 배열을 반환한다", () => {
      const currentMonth = dayjs("2024-11-01");
      const result = computeRowBlocksForMonth(currentMonth, null);
      expect(result).toEqual([]);
    });

    it("현재 월의 하이라이트 블록을 올바르게 계산한다", () => {
      // 오늘: 2024-11-01 (금), 마감일: 2024-11-15 (금)
      const currentMonth = dayjs("2024-11-01");
      const selectedDeadline = "2024-11-15";
      const expected: RowBlock[] = [
        // 11/01(5) ~ 11/02(6)
        { row: 0, startIdx: 5, endIdx: 6 },
        // 11/03(7) ~ 11/09(13)
        { row: 1, startIdx: 7, endIdx: 13 },
        // 11/10(14) ~ 11/15(18)
        { row: 2, startIdx: 14, endIdx: 19 },
      ];
      const result = computeRowBlocksForMonth(currentMonth, selectedDeadline);
      expect(result).toEqual(expected);
    });

    it("하이라이트 범위가 다음 달로 넘어갈 경우에도 올바르게 계산한다", () => {
      // 오늘: 2024-11-25 (월), 마감일: 2024-12-05 (목)
      jest.setSystemTime(new Date("2024-11-25T00:00:00.000Z"));
      const currentMonth = dayjs("2024-11-01");
      const selectedDeadline = "2024-12-05";
      const expected: RowBlock[] = [
        // 11/25(29) ~ 11/30(34)
        { row: 4, startIdx: 29, endIdx: 34 },
      ];
      const result = computeRowBlocksForMonth(currentMonth, selectedDeadline);
      expect(result).toEqual(expected);
    });
  });
});
