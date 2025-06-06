export const END_POINTS = {
  POST_USER_TYPE: "/user-type",
  GET_USER_TYPE_RESULT: "/user-type/result",
  GET_PARTICIPATION_REGISTERED: "/participation/registered",
  GET_PARICIPATION_HOSTED: "/participation/hosted",
  GET_EVENT: (eventId: number) => `/events/${eventId}`,
  EVENT_REGISTER: (eventId: number) => `/events/${eventId}/register`,
  DELETE_EVENT_RECRUIT: (eventId: number) => `/events/${eventId}/recruit`,
  POST_EVENT_VENUE: (eventId: number) => `/events/${eventId}/venue`,
  GET_TO_TICKET: (eventId: number) => `/tickets/${eventId}/to-ticket`,
  GET_EVENT_SEARCH: "/events/search",
};
