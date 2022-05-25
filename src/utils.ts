export function getMessage(): string {
  return 'Hello world!'
}

export const compareFloat = (
  a: number,
  b: number,
  EPSILON = 0.00001
): boolean => Math.abs(a - b) < EPSILON

// Get a square of a number
export const sq = (value: number): number => {
  return Math.pow(value, 2)
}
