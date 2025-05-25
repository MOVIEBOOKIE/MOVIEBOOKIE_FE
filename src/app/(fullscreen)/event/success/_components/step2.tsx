"use client";

import DetailContent from "@/components/detail-content";
import { EventData } from "app/_types/event";

const mockData: EventData = {
  eventId: 1,
  mediaType: "영화",
  mediaTitle: "인셉션",
  eventTitle: "인셉션 같이 봐요!",
  description: "영화 인셉션을 단체로 함께 관람해요. 끝나고 후토크도 해요!",
  estimatedPrice: 12000,
  eventDate: "2025-06-15",
  eventTime: "18:00",
  recruitmentDate: "2025-06-01",
  d_day: "D-5",
  minParticipants: 3,
  maxParticipants: 10,
  currentParticipants: 4,
  recruitmentRate: 40,
  posterImageUrl: "/images/poster-inception.jpg",
  buttonState: "참여하기",
  username: "홍길동",
  recruitment: 7,
  locationName: "CGV 강남",
  address: "서울 강남구 테헤란로 10",
  locationImageUrl: "/images/location-cgv.jpg",
  userImageUrl: "/images/user-profile.jpg",
  longitude: 127.0276,
  latitude: 37.4979,
};

export default function Step2() {
  return <DetailContent data={mockData} />;
}
