export const createRandomArray = (minLength: number, maxLength: number, maxNumber: number): number[] => {
  const arrLength = Math.floor(Math.random() * (maxLength - minLength + 1) + minLength)
  const array: number[] = [];
  for(let i = 0; i < arrLength; i++) {
    array.push(Math.round(Math.random() * maxNumber))
  }
  return array
}