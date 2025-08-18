export const formatDate = (dateStr: string): string => {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const date = new Date(dateStr);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayName = days[date.getDay()];

  return `${year}. ${String(month).padStart(2, "0")}. ${String(day).padStart(2, "0")} (${dayName})`;
};
