import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { swap } from "../../utils/swap";
import { sortBubble, sortSelection } from "./sort";

const inputArray = [
  { value: 12, state: ElementStates.Default },
  { value: 69, state:ElementStates.Default },
  { value: 78, state:ElementStates.Default },
  { value: 0, state:ElementStates.Default },
  { value: 7, state:ElementStates.Default }
];

const sortArrayAscending = [
    { value: 0, state: ElementStates.Modified },
    { value: 7, state:ElementStates.Modified },
    { value: 12, state:ElementStates.Modified },
    { value: 69, state:ElementStates.Modified },
    { value: 78, state:ElementStates.Modified }
];

const sortArrayDescending = [
    { value: 78, state: ElementStates.Modified },
    { value: 69, state:ElementStates.Modified },
    { value: 12, state:ElementStates.Modified },
    { value: 7, state:ElementStates.Modified },
    { value: 0, state:ElementStates.Modified }
];

describe('test swap utility function', () => {
  swap(inputArray, 1, 3)
  expect(inputArray[1]).toEqual({value:0, state: ElementStates.Default})
  expect(inputArray[3]).toEqual({value:69, state: ElementStates.Default})
})

describe('test bubble sort algorithm', () => {
  test('Should ascending bubble sort empty array', () => {
    expect(sortBubble(Direction.Ascending, [])).toEqual([])
  })

  test('Should descending bubble sort empty array', () => {
    expect(sortBubble(Direction.Descending, [])).toEqual([])
  })

  test('Should ascending bubble sort array', () => {
    let result = sortBubble(Direction.Ascending, inputArray)
    expect(result[14].array).toEqual(sortArrayAscending)
  })

  test('Should descending bubble sort array', () => {
    let result = sortBubble(Direction.Descending, inputArray)
    expect(result[14].array).toEqual(sortArrayDescending)
  })
})

describe('test selection sort algorithm', () => {
  test('Should ascending selection sort empty array', () => {
    expect(sortSelection(Direction.Ascending, [])).toEqual([])
  })

  test('Should descending selection sort empty array', () => {
    expect(sortSelection(Direction.Descending, [])).toEqual([])
  })

  test('Should ascending selection sort array', () => {
    let result = sortSelection(Direction.Ascending, inputArray)
    expect(result[25].array).toEqual(sortArrayAscending)
  })
  
  test('Should descending selection sort array', () => {
    let result = sortSelection(Direction.Descending, inputArray)
    expect(result[25].array).toEqual(sortArrayDescending)
  })
})