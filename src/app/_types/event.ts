// 상태 저장용
export interface EventFormValues {
  mediaType: string;
  eventDate: string;
  eventStartTime: string;
  eventProgressTime: string;
  recruitmentStart: string;
  recruitmentEnd: string;
  minParticipants: string;
  maxParticipants: string;
  locationId: number | null;
  mediaTitle: string;
  eventTitle: string;
  description: string;
  thumbnail: File | null;
}

// 서버 요청용
export interface EventRequestPayload {
  mediaType: string;
  eventDate: string;
  eventStartTime: string;
  eventProgressTime: number;
  recruitmentStart: string;
  recruitmentEnd: string;
  minParticipants: number;
  maxParticipants: number;
  locationId: number;
  mediaTitle: string;
  eventTitle: string;
  description: string;
}
