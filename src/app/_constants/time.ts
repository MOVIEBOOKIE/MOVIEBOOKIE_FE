/** 알림 폴링 간격 (ms) - 활성 상태 */
export const NOTIFICATION_POLLING_ACTIVE_INTERVAL = 30 * 1000;

/** 알림 폴링 간격 (ms) - 백그라운드 상태 */
export const NOTIFICATION_POLLING_BACKGROUND_INTERVAL = 1000 * 60 * 5; // 5분

/** 알림 최소 재조회 간격 (ms) - 백그라운드 중 중복 호출 방지용 */
export const NOTIFICATION_MINIMUM_CHECK_INTERVAL = 60 * 1000;
