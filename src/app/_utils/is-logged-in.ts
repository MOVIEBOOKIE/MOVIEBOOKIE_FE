export const isLoggedIn = (): boolean => {
  if (typeof window === "undefined") return false;

  try {
    const profile = localStorage.getItem("userProfile");
    return !!profile && profile !== "null" && profile !== "undefined";
  } catch (e) {
    return false;
  }
};
