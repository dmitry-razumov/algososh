export const fibonacci = (index: number, memo: Record<number, number> = { 0: 1, 1: 1}):  Record<number, number> => {
  if (!(index in memo)) {
    memo[index] = fibonacci(index - 1, memo)[index-1] + fibonacci(index - 2, memo)[index-2];
  }
  return memo
}