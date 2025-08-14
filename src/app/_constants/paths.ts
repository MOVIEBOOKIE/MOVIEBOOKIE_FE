export const PATHS = {
  HOME: "/",
  EVENT: "/event",
  TICKET: "/ticket",
  TICKETLIST: "/ticket",
  NOTIFICATIONS: "/notifications",
  MYPAGE: "/my-page",
  SEARCH: "/search",
  LOGIN: "/login",
  EVENT_CREATE: "/event-create",
  EVENT_DETAIL: (eventId: number) => `/detail/${eventId}`,
  EVENT_COMPLETED: (eventId: number) => `/event-completed/${eventId}`,
  KAKAO_LOGIN: "/login/kakao",
  EVENT_SUCCESS: "/event/success",
  VERIFY_PHONE: "/verify/phone",
  VERIFY_EMAIL: "/verify/email",
  SET_PROFILE: "/set-profile",
  AGREEMENT: "/agreement",
  CATEGORY: {
    POPULAR: "/category/popular",
    RECENT: "/category/recent",
    MOVIE: "/category/movie",
    DRAMA: "/category/drama",
    ENTERTAINMENT: "/category/entertainment",
    CONCERT: "/category/concert",
    SPORTS: "/category/sports",
    ETC: "/category/etc",
  },
  TOS: "/terms-of-service", //서비스이용약관
  PRIVACY_POLICY: "/privacy-policy", // 개인정보처리방침
  FEEDBACK: "/feedback",
  WITHDRAWAL: "/withdraw",
  SOCIAL_ACCOUNTS: "/accounts", // 연결된 소셜계정
  FEEDBACK_RESULT: "/feedback/result",
  FEEDBACK_RESULT_WITH_TYPE: (type: "good" | "bad", eventId?: number) =>
    eventId
      ? `/feedback/result?type=${type}&eventId=${eventId}`
      : `/feedback/result?type=${type}`,
  TRAIT_RESULT: "/trait/result",
  TRAIT: "/trait",
} as const;
