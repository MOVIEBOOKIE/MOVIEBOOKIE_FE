export const formatPhoneNumber = (value: string) => {
  const numbersOnly = value.replace(/\D/g, "");

  if (numbersOnly.length <= 3) {
    return numbersOnly;
  } else if (numbersOnly.length <= 7) {
    return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3)}`;
  } else {
    return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 7)}-${numbersOnly.slice(7, 11)}`;
  }
};
export const formatPhoneNumberToBasic = (num: string) => {
  if (!num) return "";
  return num.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
};
