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

export interface EventData {
  eventId: number;
  mediaType: string;
  mediaTitle: string;
  eventTitle: string;
  description: string;
  estimatedPrice: number;
  eventDate: string;
  eventTime: string;
  recruitmentDate: string;
  d_day: string;
  minParticipants: number;
  maxParticipants: number;
  currentParticipants: number;
  recruitmentRate: number;
  posterImageUrl: string;
  buttonState: string;
  username: string;
  recruitment: number;
  locationName: string;
  address: string;
  locationImageUrl: string;
  userImageUrl: string;
  longitude: number;
  latitude: number;
  eventState: string;
  userRole: string;
}
