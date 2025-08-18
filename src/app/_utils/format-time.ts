export const formatTime = (timeStr: string): string => {
  if (!timeStr || !timeStr.includes(":")) return timeStr;

  const [hour, minute] = timeStr.split(":");

  return `${hour}시 ${minute}분`;
};
