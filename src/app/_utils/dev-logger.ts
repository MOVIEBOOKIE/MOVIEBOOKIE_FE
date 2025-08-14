export const __DEV__ =
  process.env.NODE_ENV !== "production" ||
  process.env.NEXT_PUBLIC_DEBUG === "true";

export const devLog = (...args: any[]) => {
  if (__DEV__) console.log(...args);
};
export const devWarn = (...args: any[]) => {
  if (__DEV__) console.warn(...args);
};
export const devError = (...args: any[]) => {
  if (__DEV__) console.error(...args);
};
