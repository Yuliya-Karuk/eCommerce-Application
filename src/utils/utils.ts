export function convertCentsToDollarsString(num: number, fractionDigits = 2): string {
  const divisor = 10 ** fractionDigits;
  const result = num / divisor;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(result);
}
