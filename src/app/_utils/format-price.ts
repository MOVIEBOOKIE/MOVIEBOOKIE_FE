export function formatPrice(price: number): string {
  return price >= 10000
    ? `${Math.floor(price / 10000)}만원`
    : `${price.toLocaleString()}원`;
}
