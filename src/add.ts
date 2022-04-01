export function add (...numbers: number[]): number {
  return numbers.reduce((sum, n) => sum + n, 0);
}
