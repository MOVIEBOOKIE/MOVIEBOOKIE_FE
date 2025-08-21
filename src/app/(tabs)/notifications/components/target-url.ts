export function TargetUrl(title: string, id?: string): string | null {
  if (!id) return null;

  if (title.includes("상영 완료")) {
    return `/event-completed/${id}`;
  }

  const detailRequiredKeywords = [
    "신청 완료",
    "생성 완료",
    "신청 취소",
    "모집 취소",
    "취소 완료",
    "모집 마감",
    "모집 완료",
    "대관 취소",
    "대관 확정",
    "대관 불가",
  ];

  if (detailRequiredKeywords.some((kw) => title.includes(kw))) {
    return `/detail/${id}`;
  }

  return null;
}
