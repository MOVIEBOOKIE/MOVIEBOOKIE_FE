import Card from "../app/_components/main-card";

export default function Home() {
  return (
    <div className="space-y-5 pt-4">
      <Card
        imageUrl="/test-images/test.png"
        category="예능"
        title="환승연애2 마지막화"
        placeAndDate="신촌 아트레온 · 2025.05.26"
        description="안녕하세요, 대관 관련 상세정보입니다. 대관 관련 상세정보입니다.안녕하세요, 대관 관련 상세정보입니다. 대관 관련 상세정보입니다."
        ddayBadge="D-4"
        statusBadge="모집 중"
        progressRate="60%"
        estimatedPrice="24,000원"
      />
      <Card
        imageUrl="/test-images/test.png"
        category="영화"
        title="더 폴: 오디어스와 환상의 문"
        placeAndDate="신촌 아트레온 · 2025.05.26"
        description="안녕하세요, 대관 관련 상세정보입니다. 대관 관련 상세정보입니다.안녕하세요, 대관 관련 상세정보입니다. 대관 관련 상세정보입니다."
        statusBadge="모집 완료"
        progressRate="60%"
        estimatedPrice="24,000원"
      />
    </div>
  );
}
