export type PermissionState = "default" | "granted" | "denied" | "unsupported";
export type PermissionOutcome =
  | "granted"
  | "denied"
  | "dismissed"
  | "unsupported";

export function getNotificationPermission(): PermissionState {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return "unsupported";
  }
  return Notification.permission;
}

export async function requestPermissionWithOutcome(): Promise<PermissionOutcome> {
  const state = getNotificationPermission();
  if (state === "unsupported") return "unsupported";
  if (state === "granted") return "granted";
  if (state === "denied") return "denied";

  const result = await Notification.requestPermission();
  if (result === "granted") return "granted";
  if (result === "denied") return "denied";
  return "dismissed";
}
