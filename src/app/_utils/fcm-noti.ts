export type PermissionState = "default" | "granted" | "denied" | "unsupported";

export function getNotificationPermission(): PermissionState {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return "unsupported";
  }
  return Notification.permission;
}

/**
 * 기본 정책:
 * - default이면 권한 모달을 띄움(반드시 "사용자 제스처" 내에서 호출)
 * - granted면 true
 * - denied면 false
 */
export async function requestPermissionIfDefault(): Promise<boolean> {
  const state = getNotificationPermission();
  if (state === "unsupported") return false;
  if (state === "granted") return true;
  if (state === "default") {
    const result = await Notification.requestPermission();
    return result === "granted";
  }
  // denied
  return false;
}
