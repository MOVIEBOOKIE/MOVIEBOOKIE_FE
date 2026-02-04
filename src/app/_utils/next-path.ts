export const getSafeNextPath = (nextParam: string | null) =>
  nextParam && nextParam.startsWith("/") ? nextParam : "";

export const appendNextQuery = (url: string, nextPath: string) => {
  if (!nextPath) return url;
  const joiner = url.includes("?") ? "&" : "?";
  return `${url}${joiner}next=${encodeURIComponent(nextPath)}`;
};
