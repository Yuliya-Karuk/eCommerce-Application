export function isNotNullable<T>(value: T): NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(`Not expected value`);
  }
  return value;
}

export function getDollarsFromCents(num: number, fractionDigits = 2): number {
  const divisor = 10 ** fractionDigits;
  const result = num / divisor;

  return result;
}

export function formatToDollarAmount(amount: number): string {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}
